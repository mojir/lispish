#!/usr/bin/env node
/* eslint-disable node/prefer-global/process */
/* eslint-disable no-console */

import fs from 'node:fs'
import { version } from '../../package.json'
import type { Context } from '../../src'
import {
  Lits,
  normalExpressionKeys,
  polishReservedNames,
  specialExpressionKeys,
} from '../../src'
import { runTest } from '../../src/testFramework'
import type { Reference } from '../../reference'
import { apiReference, isFunctionReference } from '../../reference'
import { asAny } from '../../src/typeGuards/lits'
import type { UnknownRecord } from '../../src/interface'
import { stringifyValue } from '../../common/utils'
import { polishIdentifierCharacterClass, polishIdentifierFirstCharacterClass } from '../../src/identifier'
import { ColorEnum, createColorizer } from './colorizer'
import { getCliFunctionSignature } from './cliDocumentation/getCliFunctionSignature'
import { getCliDocumentation } from './cliDocumentation/getCliDocumentation'
import { getInlineCodeFormatter } from './cliFormatterRules'
import { createReadlineInterface } from './createReadlineInterface'

const fmt = createColorizer()

const HIST_SIZE = 1000
const PROMPT = fmt.bright.gray('> ')

type Maybe<T> = T | null

interface Config {
  testPattern: Maybe<string>
  testFilename: Maybe<string>
  evalFilename: Maybe<string>
  loadFilename: Maybe<string>
  context: Context
  eval: Maybe<string>
}

const historyResults: unknown[] = []
const lits = new Lits({ debug: true })
const formatValue = getInlineCodeFormatter(fmt)

const commands = ['`help', '`quit', '`builtins', '`context']
const expressionRegExp = new RegExp(`^(.*\\(\\s*)(${polishIdentifierFirstCharacterClass}${polishIdentifierCharacterClass}*)$`)
const nameRegExp = new RegExp(`^(.*?)(${polishIdentifierFirstCharacterClass}${polishIdentifierCharacterClass}*)$`)
const helpRegExp = new RegExp(`^\`help\\s+(${polishIdentifierFirstCharacterClass}${polishIdentifierCharacterClass}+)\\s*$`)
const expressions = [...normalExpressionKeys, ...specialExpressionKeys]

const config = processArguments(process.argv.slice(2))

if (config.eval) {
  execute(config.eval)
  process.exit(0)
}
else if (config.evalFilename) {
  const content = fs.readFileSync(config.evalFilename, { encoding: 'utf-8' })
  execute(content)
  process.exit(0)
}
else if (config.loadFilename) {
  const content = fs.readFileSync(config.loadFilename, { encoding: 'utf-8' })
  config.context = lits.context(content, {
    globalContext: config.context ?? undefined,
  })
  runREPL()
}
else if (config.testFilename) {
  runLitsTest(config.testFilename, config.testPattern)
  process.exit(0)
}
else {
  runREPL()
}

function runLitsTest(testPath: string, testNamePattern: Maybe<string>) {
  if (!testPath.match(/\.test\.lits/)) {
    printErrorMessage('Test file must end with .test.lits')
    process.exit(1)
  }
  const { success, tap } = runTest({
    testPath,
    testNamePattern: testNamePattern !== null ? new RegExp(testNamePattern) : undefined,
  })

  console.log(`\n${tap}`)

  if (!success)
    process.exit(1)
}

function execute(expression: string) {
  try {
    const result = lits.run(expression, {
      globalContext: config.context ?? undefined,
    })
    historyResults.unshift(result)
    if (historyResults.length > 9)
      historyResults.length = 9

    setReplHistoryVariables()
    console.log(formatValue(stringifyValue(result, false)))
  }
  catch (error) {
    printErrorMessage(`${error}`)
    config.context['*e*'] = { value: getErrorMessage(error) }
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error)
    return error.message

  return 'Unknown error'
}

function setReplHistoryVariables() {
  delete config.context['*1*']
  delete config.context['*2*']
  delete config.context['*3*']
  delete config.context['*4*']
  delete config.context['*5*']
  delete config.context['*6*']
  delete config.context['*7*']
  delete config.context['*8*']
  delete config.context['*9*']
  historyResults.forEach((value, i) => {
    config.context[`*${i + 1}*`] = { value: asAny(value) }
  })
}

function parseOption(args: string[], i: number) {
  const option = args[i]!

  if (/^-[a-z]$/i.test(option))
    return { option, argument: args[i + 1], count: 2 }

  const match = /^(--[a-z-]+)(?:=(.*))?$/i.exec(option)
  if (match)
    return { option: match[1], argument: match[2], count: 1 }

  return null
}
function processArguments(args: string[]): Config {
  const defaultConfig: Config = {
    testPattern: null,
    testFilename: null,
    evalFilename: null,
    loadFilename: null,
    context: {},
    eval: null,
  }
  let i = 0
  while (i < args.length) {
    const parsedOption = parseOption(args, i)
    if (!parsedOption) {
      printErrorMessage(`Unknown argument "${args[i]}"`)
      process.exit(1)
    }

    const { option, argument, count } = parsedOption
    i += count

    switch (option) {
      case '-t':
      case '--test':
        if (!argument) {
          printErrorMessage(`Missing filename after ${option}`)
          process.exit(1)
        }
        defaultConfig.testFilename = argument
        break
      case '-p':
      case '--test-pattern':
        if (!argument) {
          printErrorMessage(`Missing test name pattern after ${option}`)
          process.exit(1)
        }
        defaultConfig.testPattern = argument
        break
      case '-f':
      case '--file':
        if (!argument) {
          printErrorMessage(`Missing filename after ${option}`)
          process.exit(1)
        }
        defaultConfig.evalFilename = argument
        break
      case '-l':
      case '--load':
        if (!argument) {
          printErrorMessage(`Missing filename after ${option}`)
          process.exit(1)
        }
        defaultConfig.loadFilename = argument
        break
      case '-c':
      case '--context':
        if (!argument) {
          printErrorMessage(`Missing global variables after ${option}`)
          process.exit(1)
        }
        try {
          Object.entries(JSON.parse(argument) as UnknownRecord).forEach(([key, value]) => {
            defaultConfig.context[key] = { value: asAny(value) }
          })
        }
        catch (e) {
          printErrorMessage(`Couldn\`t parse context: ${getErrorMessage(e)}`)
          process.exit(1)
        }
        break
      case '-C':
      case '--context-file':
        if (!argument) {
          printErrorMessage(`Missing context filename after ${option}`)
          process.exit(1)
        }
        try {
          const contextString = fs.readFileSync(argument, { encoding: 'utf-8' })
          Object.entries(JSON.parse(contextString) as UnknownRecord).forEach(([key, value]) => {
            defaultConfig.context[key] = { value: asAny(value) }
          })
        }
        catch (e) {
          printErrorMessage(`Couldn\`t parse context: ${getErrorMessage(e)}`)
          process.exit(1)
        }
        break
      case '-e':
      case '--eval':
        if (!argument) {
          printErrorMessage(`Missing lits expression after ${option}`)
          process.exit(1)
        }
        defaultConfig.eval = argument
        break
      case '--help':
        printUsage()
        process.exit(0)
        break
      case '--version':
        console.log(version)
        process.exit(0)
        break
      default:
        printErrorMessage(`Unknown option "${option}"`)
        process.exit(1)
    }
  }
  if (defaultConfig.evalFilename && defaultConfig.eval) {
    printErrorMessage('Cannot both specify -f (--file) and -e (--eval)')
    process.exit(1)
  }
  if (defaultConfig.testFilename && defaultConfig.eval) {
    printErrorMessage('Cannot both specify -t (--test) and -e (--eval)')
    process.exit(1)
  }

  if (defaultConfig.testFilename && defaultConfig.context) {
    printErrorMessage('Cannot both specify -t (--test) and -c (--context)')
    process.exit(1)
  }

  if (defaultConfig.testFilename && defaultConfig.evalFilename) {
    printErrorMessage('Cannot both specify -t (--test) and -f (--file)')
    process.exit(1)
  }

  if (defaultConfig.testFilename && defaultConfig.loadFilename) {
    printErrorMessage('Cannot both specify -t (--test) and -l (--load)')
    process.exit(1)
  }

  return defaultConfig
}

function runREPL() {
  console.log(`Welcome to Lits v${version}.
Type ${fmt.italic('`help')} for more information.`)

  const rl = createReadlineInterface({
    completer,
    historySize: HIST_SIZE,
    prompt: PROMPT,
  })

  rl.prompt()

  rl.on('line', (line) => {
    line = line.trim()

    const helpMatch = helpRegExp.exec(line)
    if (helpMatch) {
      const name = helpMatch[1]!
      console.log(getCliDocumentation(fmt, name))
    }
    else if (line.startsWith('`')) {
      switch (line) {
        case '`builtins':
          printBuiltins()
          break
        case '`help':
          printHelp()
          break
        case '`context':
          printContext()
          break
        case '`quit':
          rl.close()
          break
        default:
          printErrorMessage(`Unrecognized command ${ColorEnum.Italic}${line}${ColorEnum.ResetItalic}, try ${ColorEnum.Italic}\`help${ColorEnum.ResetItalic}`)
      }
    }
    else if (line) {
      execute(line)
    }
    rl.prompt()
  }).on('close', () => {
    console.log('Over and out!')
    process.exit(0)
  })
}

function printBuiltins() {
  Object
    .values(apiReference)
    .sort((a, b) => a.title.localeCompare(b.title))
    .forEach((reference) => {
      console.log(`
${fmt.bright.blue(reference.title)} - ${fmt.gray(reference.category)}
${getDocString(reference)}`)
    })
}

function getDocString(reference: Reference) {
  if (isFunctionReference(reference))
    return `${getCliFunctionSignature(fmt, reference)}`
  return ''
}

function printHelp() {
  console.log(`
\`builtins                 Print all builtin functions
\`context                  Print context
\`help                     Print this help message
\`help [builtin function]  Print help for [builtin function]
\`quit                     Quit
`.trim())
}

function printUsage() {
  console.log(`
Usage: lits [options]

Options:
  -c, --context=...               Context as a JSON string
  -C, --context-file=...          Context file (.json file)
  -e, --eval=...                  Evaluate Lits expression
  -f, --file=...                  Evaluate .lits file
  -p, --test-pattern=...          Test name pattern, used together with --test
  -t, --test=...                  Test .test.lits file
  --help                          Show this help
  --version                       Print lits version
`.trim())
}

function printContext() {
  const { context } = config
  const keys = Object.keys(config.context)

  if (keys.length === 0) {
    console.log('[empty]\n')
  }
  else {
    keys.sort().forEach((x) => {
      console.log(`${x} = ${formatValue(stringifyValue(context[x]!.value, false))}`)
    })
    console.log()
  }
}

function completer(line: string) {
  const helpMatch = line.match(/`help\s+(.*)/)
  if (helpMatch)
    return [expressions.filter(c => c.startsWith(helpMatch[1]!)).map(c => `\`help ${c} `), line]

  if (line.startsWith('`'))
    return [commands.filter(c => c.startsWith(line)).map(c => `${c} `), line]

  const expressionMatch = expressionRegExp.exec(line)

  if (expressionMatch)
    return [expressions.filter(c => c.startsWith(expressionMatch[2]!)).map(c => `${expressionMatch[1]}${c} `), line]

  const names = Array.from(new Set([...polishReservedNames, ...Object.keys(config.context)]))
  const nameMatch = nameRegExp.exec(line)

  if (nameMatch)
    return [names.filter(c => c.startsWith(nameMatch[2]!)).map(c => `${nameMatch[1]}${c} `), line]

  return [[], line]
}

function printErrorMessage(message: string) {
  console.error(fmt.bright.red(message))
}

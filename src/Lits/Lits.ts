import type { Analysis } from '../analyze'
import { analyze } from '../analyze'
import { evaluate } from '../evaluator'
import { createContextStack } from '../evaluator/ContextStack'
import type { Context } from '../evaluator/interface'
import type { Any, Obj } from '../interface'
import { parse } from '../parser'
import type { Ast, LitsFunction } from '../parser/interface'
import { tokenize } from '../tokenizer'
import type { TokenStream, TokenizeParams } from '../tokenizer/interface'
import { transformTokens } from '../transformer'
import { unparseAst } from '../unparser/unparse'
import { untokenize } from '../untokenizer'
import { Cache } from './Cache'

export interface LitsRuntimeInfo {
  astCache: Cache | null
  astCacheSize: number | null
  debug: boolean
}

export interface LazyValue {
  read: () => unknown
  [key: string]: unknown
}

export interface JsFunction {
  fn: (...args: any[]) => unknown
  [key: string]: unknown
}

export interface LitsParams {
  globalContext?: Context
  contexts?: Context[]
  values?: Record<string, unknown>
  lazyValues?: Record<string, LazyValue>
  jsFunctions?: Record<string, JsFunction>
  filePath?: string
  debug?: boolean
}

interface LitsConfig {
  initialCache?: Record<string, Ast>
  astCacheSize?: number | null
  debug?: boolean
}

type FormatParams = LitsParams & {
  lineLength?: number
}

export class Lits {
  private astCache: Cache | null
  private astCacheSize: number | null
  private debug: boolean

  constructor(config: LitsConfig = {}) {
    this.debug = config.debug ?? false
    this.astCacheSize = config.astCacheSize ?? null
    if (this.astCacheSize) {
      this.astCache = new Cache(this.astCacheSize)
      const initialCache = config.initialCache ?? {}
      for (const cacheEntry of Object.keys(initialCache))
        this.astCache.set(cacheEntry, initialCache[cacheEntry] as Ast)
    }
    else {
      this.astCache = null
    }
  }

  public getRuntimeInfo(): LitsRuntimeInfo {
    return {
      astCacheSize: this.astCacheSize,
      astCache: this.astCache,
      debug: this.debug,
    }
  }

  public run(program: string, params: LitsParams = {}): unknown {
    const ast = this.generateAst(program, params)
    return this.evaluate(ast, params)
  }

  public format(program: string, params: FormatParams = {}): string {
    const lineLength = params.lineLength ?? 80
    const ast = this.generateAst(program, params)
    return unparseAst(ast, lineLength)
  }

  public context(program: string, params: LitsParams = {}): Context {
    const contextStack = createContextStack(params)
    const ast = this.generateAst(program, params)
    evaluate(ast, contextStack)
    return contextStack.globalContext
  }

  public analyze(program: string, params: LitsParams = {}): Analysis {
    const ast = this.generateAst(program, params)

    return analyze(ast, params)
  }

  public tokenize(program: string, tokenizeParams: TokenizeParams = {}): TokenStream {
    return tokenize(program, { ...tokenizeParams, debug: tokenizeParams.debug ?? this.debug })
  }

  public parse(tokenStream: TokenStream): Ast {
    return parse(tokenStream)
  }

  public evaluate(ast: Ast, params: LitsParams): Any {
    const contextStack = createContextStack(params)
    return evaluate(ast, contextStack)
  }

  public transform(tokenStream: TokenStream, transformer: (name: string) => string): TokenStream {
    return transformTokens(tokenStream, transformer)
  }

  public untokenize(tokenStream: TokenStream): string {
    return untokenize(tokenStream)
  }

  public apply(fn: LitsFunction, fnParams: unknown[], params: LitsParams = {}): Any {
    const fnName = 'FN_2eb7b316-471c-5bfa-90cb-d3dfd9164a59'
    const paramsString: string = fnParams
      .map((_, index) => {
        return `${fnName}_${index}`
      })
      .join(' ')
    const program = `(${fnName} ${paramsString})`
    const ast = this.generateAst(program, params)

    const hostValues: Obj = fnParams.reduce(
      (result: Obj, param, index) => {
        result[`${fnName}_${index}`] = param
        return result
      },
      { [fnName]: fn },
    )

    params.values = { ...params.values, ...hostValues }

    return this.evaluate(ast, params)
  }

  private generateAst(program: string, params: LitsParams): Ast {
    if (this.astCache) {
      const cachedAst = this.astCache.get(program)
      if (cachedAst)
        return cachedAst
    }
    const tokenStream = this.tokenize(program, { debug: params.debug ?? this.debug, filePath: params.filePath })
    const ast: Ast = this.parse(tokenStream)
    this.astCache?.set(program, ast)
    return ast
  }
}

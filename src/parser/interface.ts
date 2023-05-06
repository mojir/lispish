import { TypeName } from '../types/typeUtils'
import { SpecialExpressionName } from '../builtin/interface'
import { Condition } from '../builtin/specialExpressions/cond'
import { LoopBindingNode } from '../builtin/specialExpressions/loops'
import { Arity, FunctionOverload } from '../builtin/utils'
import { Context } from '../ContextStack/interface'
import { Any, Arr } from '../interface'
import { ReservedName } from '../reservedNames'
import { DebugInfo, Token } from '../tokenizer/interface'

export const FUNCTION_SYMBOL = `__LITS_FUNCTION__`
export const REGEXP_SYMBOL = `__REGEXP__`

export type EvaluatedFunctionArguments = {
  mandatoryArguments: string[]
  restArgument?: string
}

export type EvaluatedFunctionOverload = {
  arguments: EvaluatedFunctionArguments
  body: AstNode[]
  arity: Arity
  functionContext: Context
}

type GenericLitsFunction = {
  [FUNCTION_SYMBOL]: true
  debugInfo?: DebugInfo
  type: string
}

export interface RegularExpression {
  [REGEXP_SYMBOL]: true
  debugInfo?: DebugInfo
  source: string
  flags: string
}

export interface UserDefinedFunction extends GenericLitsFunction {
  type: `user-defined`
  name: string | undefined
  overloads: EvaluatedFunctionOverload[]
}

export interface PartialFunction extends GenericLitsFunction {
  type: `partial`
  fn: Any
  params: Arr
}

export interface CompFunction extends GenericLitsFunction {
  type: `comp`
  fns: Arr
}

export interface ConstantlyFunction extends GenericLitsFunction {
  type: `constantly`
  value: Any
}

export interface JuxtFunction extends GenericLitsFunction {
  type: `juxt`
  fns: Arr
}

export interface ComplementFunction extends GenericLitsFunction {
  type: `complement`
  fn: Any
}

export interface EveryPredFunction extends GenericLitsFunction {
  type: `every-pred`
  fns: Arr
}

export interface SomePredFunction extends GenericLitsFunction {
  type: `some-pred`
  fns: Arr
}

export interface FNilFunction extends GenericLitsFunction {
  type: `fnil`
  fn: Any
  params: Arr
}

export interface BuiltinFunction extends GenericLitsFunction {
  type: `builtin`
  name: string
}

export type LitsFunction =
  | UserDefinedFunction
  | BuiltinFunction
  | PartialFunction
  | CompFunction
  | ConstantlyFunction
  | JuxtFunction
  | ComplementFunction
  | EveryPredFunction
  | SomePredFunction
  | FNilFunction

export type LitsFunctionType = LitsFunction[`type`]

export type NodeType =
  | `Number`
  | `String`
  | `NormalExpression`
  | `SpecialExpression`
  | `Name`
  | `Modifier`
  | `ReservedName`
  | `Binding`
  | `Argument`
  | `Partial`
  | `TypeName`

export type ModifierName = `&` | `&let` | `&when` | `&while`

interface GenericNode {
  type: NodeType
  token?: Token
}

export type ExpressionNode = NormalExpressionNode | SpecialExpressionNode | NumberNode | StringNode
export type ParseBinding = (tokens: Token[], position: number) => [number, BindingNode]
export type ParseBindings = (tokens: Token[], position: number) => [number, BindingNode[]]
export type ParseArgument = (tokens: Token[], position: number) => [number, ArgumentNode | ModifierNode]
export type ParseExpression = (tokens: Token[], position: number) => [number, ExpressionNode]
export type ParseNormalExpression = (tokens: Token[], position: number) => [number, NormalExpressionNode]
export type ParseSpecialExpression = (tokens: Token[], position: number) => [number, SpecialExpressionNode]
export type ParseTokens = (tokens: Token[], position: number) => [number, AstNode[]]
export type ParseToken = (tokens: Token[], position: number) => [number, AstNode]

export interface NumberNode extends GenericNode {
  type: `Number`
  value: number
}
export interface StringNode extends GenericNode {
  type: `String`
  value: string
}
export interface NameNode extends GenericNode {
  type: `Name`
  value: string
}
export interface ModifierNode extends GenericNode {
  type: `Modifier`
  value: ModifierName
}
export interface ReservedNameNode extends GenericNode {
  type: `ReservedName`
  value: ReservedName
}

export interface TypeNameNode extends GenericNode {
  type: `TypeName`
  value: TypeName
}

interface NormalExpressionNodeBase extends GenericNode {
  type: `NormalExpression`
  params: AstNode[]
}

export interface NormalExpressionNodeWithName extends NormalExpressionNodeBase {
  name: string
  expression?: ExpressionNode
}

interface NormalExpressionNodeExpression extends NormalExpressionNodeBase {
  name?: never
  expression: ExpressionNode
}

export type NormalExpressionNode = NormalExpressionNodeWithName | NormalExpressionNodeExpression

export interface BindingNode extends GenericNode {
  type: `Binding`
  name: string
  value: AstNode
}

export interface ArgumentNode extends GenericNode {
  type: `Argument`
  name: string
  defaultValue?: AstNode
}

export interface SpecialExpressionNode extends GenericNode {
  type: `SpecialExpression`
  name: SpecialExpressionName
  params: AstNode[]
  binding?: BindingNode
  bindings?: BindingNode[]
  conditions?: Condition[]
  functionName?: AstNode
  overloads?: FunctionOverload[]
  loopBindings?: LoopBindingNode[]
  messageNode?: AstNode
  tryExpression?: AstNode
  error?: NameNode
  catchExpression?: AstNode
}

export type AstNode =
  | NumberNode
  | StringNode
  | ReservedNameNode
  | NameNode
  | NormalExpressionNode
  | ModifierNode
  | SpecialExpressionNode
  | TypeNameNode

export type Ast = {
  type: `Program`
  body: AstNode[]
}

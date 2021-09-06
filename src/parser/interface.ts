import { Token } from '..'
import { ReservedName } from '../reservedNames'

export const functionSymbol = Symbol('function')
export type UserDefinedLispishFunction = {
  [functionSymbol]: true
  name: string | undefined
  arguments: string[]
  body: AstNode[]
}

export type BuiltinLispishFunction = {
  [functionSymbol]: true
  builtin: string
}

export type LispishFunction = UserDefinedLispishFunction | BuiltinLispishFunction

type NodeType =
  | 'Number'
  | 'String'
  | 'NormalExpression'
  | 'SpecialExpression'
  | 'ExpressionExpression'
  | 'Name'
  | 'ReservedName'
type SpecialExpressionName = 'let' | 'if' | 'setq' | 'and' | 'or' | 'cond' | 'defun' | 'function' | 'lambda'

interface GenericNode {
  type: NodeType
}

type ExpressionNode = NormalExpressionNode | SpecialExpressionNode | ExpressionExpressionNode
export type ParseExpression = (tokens: Token[], position: number) => [number, ExpressionNode]
export type ParseNormalExpression = (tokens: Token[], position: number) => [number, NormalExpressionNode]
export type ParseSpecialExpression = (tokens: Token[], position: number) => [number, SpecialExpressionNode]
export type ParseExpressionExpression = (tokens: Token[], position: number) => [number, ExpressionExpressionNode]
export type ParseParams = (tokens: Token[], position: number) => [number, AstNode[]]
export type ParseToken = (tokens: Token[], position: number) => [number, AstNode]

export interface NumberNode extends GenericNode {
  type: 'Number'
  value: number
}
export interface StringNode extends GenericNode {
  type: 'String'
  value: string
}
export interface NameNode extends GenericNode {
  type: 'Name'
  value: string
}
export interface ReservedNameNode extends GenericNode {
  type: 'ReservedName'
  value: ReservedName
}
export interface NormalExpressionNode extends GenericNode {
  type: 'NormalExpression'
  name: string
  params: AstNode[]
}

export interface ExpressionExpressionNode extends GenericNode {
  type: 'ExpressionExpression'
  expression: ExpressionNode
  params: AstNode[]
}

export interface SpecialExpressionNode<T extends SpecialExpressionName = SpecialExpressionName> extends GenericNode {
  type: 'SpecialExpression'
  name: T
  params: AstNode[]
}

export type AstNode =
  | NumberNode
  | StringNode
  | ReservedNameNode
  | NameNode
  | NormalExpressionNode
  | SpecialExpressionNode
  | ExpressionExpressionNode

export type Ast = {
  type: 'Program'
  body: AstNode[]
}

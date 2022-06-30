import { Static, TSelf, Type } from '@sinclair/typebox'
import { TReference } from './reference'
import { TServer } from './server'
import { TExternalDocumentation } from './externalDocumentation'
import { TParameter } from './parameter'
import { TResponse } from './response'
import { TSecurityRequirement } from './securityRequirement'
import { TRequestBody } from './requestBody'

export const TMethod = Type.Union([
  Type.Literal('get'),
  Type.Literal('put'),
  Type.Literal('post'),
  Type.Literal('delete'),
  Type.Literal('options'),
  Type.Literal('head'),
  Type.Literal('patch'),
  Type.Literal('trace')
])

export type Method = Static<typeof TMethod>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function TOperation (TPathItem: TSelf) {
  return Type.Object({
    tags: Type.Optional(Type.Array(Type.String())),
    summary: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    externalDocs: Type.Optional(Type.Ref(TExternalDocumentation)),
    operationId: Type.Optional(Type.String()),
    parameters: Type.Optional(Type.Array(Type.Union([
      Type.Ref(TReference),
      Type.Ref(TParameter)
    ]))),
    requestBody: Type.Optional(Type.Union([
      Type.Ref(TReference),
      Type.Ref(TRequestBody)
    ])),
    responses: Type.Optional(Type.Record(Type.String(), Type.Union([
      Type.Ref(TReference),
      Type.Ref(TResponse)
    ]))),
    callbacks: Type.Optional(Type.Record(Type.String(), Type.Union([
      Type.Ref(TReference),
      TPathItem
    ]))),
    deprecated: Type.Optional(Type.Boolean()),
    security: Type.Optional(Type.Array(Type.Ref(TSecurityRequirement))),
    servers: Type.Optional(Type.Array(Type.Ref(TServer)))
  })
}

export const TPathItem = Type.Recursive(Self => Type.Object({
  summary: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  servers: Type.Optional(Type.Array(Type.Ref(TServer))),
  parameters: Type.Optional(Type.Array(Type.Union([
    Type.Ref(TReference),
    Type.Ref(TParameter)
  ]))),
  get: Type.Optional(TOperation(Self)),
  put: Type.Optional(TOperation(Self)),
  post: Type.Optional(TOperation(Self)),
  delete: Type.Optional(TOperation(Self)),
  options: Type.Optional(TOperation(Self)),
  head: Type.Optional(TOperation(Self)),
  patch: Type.Optional(TOperation(Self)),
  trace: Type.Optional(TOperation(Self))
}), { $id: 'PathItem' })

export type PathItem = Static<typeof TPathItem>

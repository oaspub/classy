import { Type, Static } from '@sinclair/typebox'
import { TExternalDocumentation } from './externalDocumentation'
import { TReference } from './reference'
import { TParameter } from './parameter'
import { TResponse } from './response'
import { TSecurityRequirement } from './securityRequirement'
import { TServer } from './server'
import { TCallback } from './callback'
import { TRequestBody } from './requestBody'

export const TOperation = Type.Object({
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
  callbacks: Type.Optional(Type.Ref(TCallback)),
  deprecated: Type.Optional(Type.Boolean()),
  security: Type.Optional(Type.Array(Type.Ref(TSecurityRequirement))),
  servers: Type.Optional(Type.Array(Type.Ref(TServer)))
}, { $id: 'Operation' })

export type Operation = Static<typeof TOperation>

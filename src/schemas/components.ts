import { Type, Static } from '@sinclair/typebox'
import { TSchema } from './schema'
import { TReference } from './reference'
import { TResponse } from './response'
import { TParameter } from './parameter'
import { TExample } from './example'
import { TRequestBody } from './requestBody'
import { THeader } from './header'
import { TSecurityScheme } from './securityScheme'
import { TLink } from './link'
import { TCallback } from './callback'
import { TPathItem } from './pathItem'

export const TComponents = Type.Object({
  schemas: Type.Optional(Type.Record(Type.String(), Type.Ref(TSchema))),
  responses: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(TResponse)
  ]))),
  parameters: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(TParameter)
  ]))),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(TExample)
  ]))),
  requestBodies: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(TRequestBody)
  ]))),
  headers: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(THeader)
  ]))),
  securitySchemes: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(TSecurityScheme)
  ]))),
  links: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(TLink)
  ]))),
  callbacks: Type.Optional(Type.Ref(TCallback)),
  pathItems: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(TPathItem)
  ])))
}, { $id: 'Components' })

/*
TODO: All the fixed fields declared above are objects that MUST use keys that match the regular expression: ^[a-zA-Z0-9\.\-_]+$.
Field Name Examples:

User
User_1
User_Name
user-name
my.org.User
*/

export type Components = Static<typeof TComponents>

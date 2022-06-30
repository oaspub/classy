import { Type, Static } from '@sinclair/typebox'
import { TServer } from './server'

export const TLink = Type.Object({
  operationRef: Type.Optional(Type.String()),
  operationId: Type.Optional(Type.String()),
  parameters: Type.Optional(Type.Record(Type.String(), Type.Any())),
  requestBody: Type.Optional(Type.Any()),
  description: Type.Optional(Type.String()),
  server: Type.Optional(Type.Ref(TServer))
}, { $id: 'Link' })

export type Link = Static<typeof TLink>

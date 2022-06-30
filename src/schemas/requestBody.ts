import { Type, Static } from '@sinclair/typebox'
import { TMediaType } from './mediaType'

export const TRequestBody = Type.Object({
  description: Type.Optional(Type.String()),
  content: Type.Record(Type.String(), Type.Ref(TMediaType)),
  required: Type.Optional(Type.Boolean())
}, { $id: 'RequestBody' })

export type RequestBody = Static<typeof TRequestBody>

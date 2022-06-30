import { Type, Static } from '@sinclair/typebox'
import { TSchema } from './schema'
import { TReference } from './reference'
import { TExample } from './example'
import { TEncoding } from './encoding'

export const TMediaType = Type.Object({
  schema: Type.Optional(Type.Ref(TSchema)),
  example: Type.Optional(Type.Any()),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(TExample)
  ]))),
  encoding: Type.Optional(Type.Record(Type.String(), Type.Ref(TEncoding)))
}, { $id: 'MediaType' })

export type MediaType = Static<typeof TMediaType>

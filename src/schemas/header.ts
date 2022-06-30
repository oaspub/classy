import { Type, Static } from '@sinclair/typebox'
import { TSchema } from './schema'
import { TReference } from './reference'
import { TExample } from './example'
import { TParameterStyle } from './parameter'

export const THeader = Type.Object({
  description: Type.Optional(Type.String()),
  required: Type.Optional(Type.Boolean()),
  deprecated: Type.Optional(Type.Boolean()),
  allowEmptyValue: Type.Optional(Type.Boolean()),
  style: Type.Optional(Type.Ref(TParameterStyle)),
  explode: Type.Optional(Type.Boolean()),
  allowReserved: Type.Optional(Type.Boolean()),
  schema: Type.Optional(Type.Ref(TSchema)),
  example: Type.Optional(Type.Any()),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(TExample)
  ])))
}, { $id: 'Header' })

export type Header = Static<typeof THeader>

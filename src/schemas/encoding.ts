import { Type, Static } from '@sinclair/typebox'
import { TReference } from './reference'
import { THeader } from './header'

export const TEncoding = Type.Object({
  contentType: Type.Optional(Type.String()),
  headers: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(THeader)
  ]))),
  style: Type.Optional(Type.String()),
  explode: Type.Optional(Type.Boolean()),
  allowReserved: Type.Optional(Type.Boolean())
}, { $id: 'Encoding' })

export type Encoding = Static<typeof TEncoding>

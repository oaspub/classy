import { Type, Static } from '@sinclair/typebox'
import { TReference } from './reference'
import { THeader } from './header'
import { TMediaType } from './mediaType'
import { TLink } from './link'

export const TResponse = Type.Object({
  description: Type.String(),
  headers: Type.Optional(Type.Record(
    Type.String(),
    Type.Union([
      Type.Ref(TReference),
      Type.Ref(THeader)
    ])
  )),
  content: Type.Optional(Type.Record(
    Type.String(),
    Type.Ref(TMediaType)
  )),
  links: Type.Optional(Type.Record(
    Type.String(),
    Type.Union([
      Type.Ref(TReference),
      Type.Ref(TLink)
    ])))
}, { $id: 'Response' })

export type Response = Static<typeof TResponse>

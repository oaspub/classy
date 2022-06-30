import { Static, Type } from '@sinclair/typebox'
import { TServerVariable } from './serverVariable'

export const TServer = Type.Object({
  url: Type.String(),
  description: Type.Optional(Type.String()),
  variables: Type.Optional(Type.Record(Type.String(), Type.Ref(TServerVariable)))
}, { $id: 'Server' })

export type Server = Static<typeof TServer>

import { Static, Type } from '@sinclair/typebox'

export const TServerVariable = Type.Object({
  enum: Type.Optional(Type.Array(Type.String())),
  default: Type.String(),
  description: Type.Optional(Type.String())
}, { $id: 'ServerVariable' })

export type ServerVariable = Static<typeof TServerVariable>

import { Static, Type } from '@sinclair/typebox'

export const TLicense = Type.Object({
  name: Type.String(),
  identifier: Type.Optional(Type.String()),
  url: Type.Optional(Type.String())
}, { $id: 'License' })

export type License = Static<typeof TLicense>

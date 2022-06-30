import { Static, Type } from '@sinclair/typebox'

export const TContact = Type.Object({
  name: Type.Optional(Type.String()),
  url: Type.Optional(Type.String()),
  email: Type.Optional(Type.String())
}, { $id: 'Contact' })

export type Contact = Static<typeof TContact>

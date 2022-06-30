import { Type, Static } from '@sinclair/typebox'

export const TExternalDocumentation = Type.Object({
  description: Type.Optional(Type.String()),
  url: Type.String()
}, { $id: 'ExternalDocumentation' })

export type ExternalDocumentation = Static<typeof TExternalDocumentation>

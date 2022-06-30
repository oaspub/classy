import { Type, Static } from '@sinclair/typebox'
import { TExternalDocumentation } from './externalDocumentation'

export const TTag = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  externalDoc: Type.Optional(Type.Ref(TExternalDocumentation))
}, { $id: 'Tag' })

export type Tag = Static<typeof TTag>

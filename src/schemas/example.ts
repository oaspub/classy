import { Type, Static } from '@sinclair/typebox'

export const TExample = Type.Object({
  summary: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  value: Type.Optional(Type.Any()),
  externalValue: Type.Optional(Type.String())
}, { $id: 'Example' })

export type Example = Static<typeof TExample>

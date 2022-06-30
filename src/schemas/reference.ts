import { Static, Type } from '@sinclair/typebox'

export const TReference = Type.Object({
  $ref: Type.String()
}, { $id: 'Reference' })

export type Reference = Static<typeof TReference>

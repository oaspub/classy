import { Type, Static } from '@sinclair/typebox'

export const TSecurityRequirement = Type.Record(Type.String(), Type.Array(Type.String()), { $id: 'SecurityRequirement' })

export type SecurityRequirement = Static<typeof TSecurityRequirement>

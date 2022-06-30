import { Type, Static } from '@sinclair/typebox'

// TODO - Consider implementing the JSON Schema specification
export const TSchema = Type.Any({ $id: 'Schema' })

export type Schema = Static<typeof TSchema>

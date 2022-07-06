import { TSchema, Kind } from '@sinclair/typebox'

export function isTSchema (value: unknown): value is TSchema {
  return value != null && typeof value === 'object' && Object.hasOwnProperty.call(value, Kind)
}

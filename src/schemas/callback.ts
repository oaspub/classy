import { Type, Static } from '@sinclair/typebox'
import { TReference } from './reference'
import { TPathItem } from './pathItem'

export const TCallback = Type.Record(Type.String(), Type.Union([
  Type.Ref(TReference),
  Type.Ref(TPathItem)
]), { $id: 'Callback' })

export type Callback = Static<typeof TCallback>

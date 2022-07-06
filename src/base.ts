import { Static, TSchema } from '@sinclair/typebox'
import pickBy from 'lodash.pickby'

export class Base<T extends TSchema = any> {
  json (): Static<T> {
    return pickBy(this, (value) => typeof value !== 'function')
  }
}

import * as S from '@oaspub/oaschemas'
import { Validator } from '@oaspub/oaschemas'
import { Base } from './base'

export class Example<T = any> extends Base<typeof S.TExample> implements S.Example {
  summary?: string
  description?: string
  value!: T
  externalValue?: string

  constructor (data?: S.Example) {
    super()
    Object.assign(this, data)
  }

  static from (data: unknown): Example {
    const parsed = Example.validator.parse(data)
    return new Example(parsed)
  }

  static validator = new Validator(S.TExample)

  $summary (summary: string): Example {
    return new Example({ ...this.json(), summary })
  }

  $description (description: string): Example {
    return new Example({ ...this.json(), description })
  }

  $value<T = any>(value: T): Example<T> {
    return new Example({ ...this.json(), value })
  }

  $externalValue (externalValue: string): Example {
    return new Example({ ...this.json(), externalValue })
  }
}

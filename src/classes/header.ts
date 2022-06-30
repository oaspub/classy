import * as S from '@oaspub/oaschemas/dist/schemas'
import { Validator } from '@oaspub/oaschemas'
import { TSchema } from '@sinclair/typebox'
import { Base } from './base'
import { Example } from './example'

export class Header<T extends TSchema = any> extends Base<typeof S.THeader> implements S.Header {
  description?: string
  required?: boolean
  deprecated?: boolean
  allowEmptyValue?: boolean
  style?: S.ParameterStyle
  explode?: boolean
  allowReserved?: boolean
  schema?: T
  example?: any
  examples?: Record<string, Example>

  constructor (data?: S.Header) {
    super()
    Object.assign(this, data)
  }

  static from<T extends TSchema = any> (data: unknown): Header<T> {
    const parsed = Header.validator.parse(data)
    return new Header(parsed)
  }

  static validator = new Validator(S.THeader)

  $description (description: string): Header<T> {
    return new Header({ ...this.json(), description })
  }

  $required (required = true): Header<T> {
    return new Header({ ...this.json(), required })
  }

  $deprecated (deprecated = true): Header<T> {
    return new Header({ ...this.json(), deprecated })
  }

  $allowEmptyValue (allowEmptyValue = true): Header<T> {
    return new Header({ ...this.json(), allowEmptyValue })
  }

  $style (style: S.Parameter['style']): Header<T> {
    return new Header({ ...this.json(), style })
  }

  $explode (explode = true): Header<T> {
    return new Header({ ...this.json(), explode })
  }

  $allowReserved (allowReserved = true): Header<T> {
    return new Header({ ...this.json(), allowReserved })
  }

  $schema<T extends TSchema> (schema: T): Header<T> {
    return new Header({
      ...this.json(),
      schema
    })
  }

  $example (name: string, ...args: ConstructorParameters<typeof Example>): Header<T> {
    const examples = { ...this.examples, [name]: new Example(...args) }
    return new Header({ ...this.json(), examples })
  }
}

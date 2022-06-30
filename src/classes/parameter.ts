import * as S from '@oaspub/oaschemas/dist/schemas'
import { Validator } from '@oaspub/oaschemas'
import { TSchema, Type } from '@sinclair/typebox'
import { Example } from './example'
import { Base } from './base'

export class Parameter<T extends TSchema = any> extends Base<typeof S.TParameter> implements S.Parameter {
  name!: string
  in!: S.ParameterLocation
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

  constructor (data: S.Parameter)
  constructor (name: string, location: S.Parameter['in'], data?: Partial<S.Parameter>)
  constructor (value: string | S.Parameter, location?: S.Parameter['in'], data?: Partial<S.Parameter>) {
    super()
    const parameter = typeof value === 'string'
      ? {
          ...data,
          name: value,
          in: location,
          ...data?.schema != null && { schema: Type.Strict(data.schema) }
        }
      : value
    Object.assign(this, parameter)
  }

  static from<T extends TSchema = any> (data: unknown): Parameter<T> {
    const parsed = Parameter.validator.parse(data)
    return new Parameter(parsed)
  }

  static validator = new Validator(S.TParameter)

  static query<T extends TSchema> (name: S.Parameter['name'], schema?: T, data?: Partial<S.Parameter>): Parameter<T> {
    return new Parameter(name, 'query', { ...data, ...schema != null && { schema } })
  }

  static header<T extends TSchema> (name: S.Parameter['name'], schema?: T, data?: Partial<S.Parameter>): Parameter<T> {
    return new Parameter(name, 'header', { ...data, ...schema != null && { schema } })
  }

  static path<T extends TSchema> (name: S.Parameter['name'], schema?: T, data?: Partial<S.Parameter>): Parameter<T> {
    return new Parameter(name, 'path', { ...data, ...schema != null && { schema } })
  }

  static cookie<T extends TSchema> (name: S.Parameter['name'], schema?: T, data?: Partial<S.Parameter>): Parameter<T> {
    return new Parameter(name, 'cookie', { ...data, ...schema != null && { schema } })
  }

  $name (name: string): Parameter<T> {
    return new Parameter({ ...this.json(), name })
  }

  $in (location: S.Parameter['in']): Parameter<T> {
    return new Parameter({ ...this.json(), in: location })
  }

  $description (description: string): Parameter<T> {
    return new Parameter({ ...this.json(), description })
  }

  $required (required = true): Parameter<T> {
    return new Parameter({ ...this.json(), required })
  }

  $deprecated (deprecated = true): Parameter<T> {
    return new Parameter({ ...this.json(), deprecated })
  }

  $allowEmptyValue (allowEmptyValue = true): Parameter<T> {
    return new Parameter({ ...this.json(), allowEmptyValue })
  }

  $style (style: S.Parameter['style']): Parameter<T> {
    return new Parameter({ ...this.json(), style })
  }

  $explode (explode = true): Parameter<T> {
    return new Parameter({ ...this.json(), explode })
  }

  $allowReserved (allowReserved = true): Parameter<T> {
    return new Parameter({ ...this.json(), allowReserved })
  }

  $example (name: string, ...args: ConstructorParameters<typeof Example>): Parameter<T> {
    const examples = { ...this.examples, [name]: new Example(...args) }
    return new Parameter({ ...this.json(), examples })
  }
}

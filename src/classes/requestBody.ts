import * as S from '@oaspub/oaschemas/dist/schemas'
import { Validator } from '@oaspub/oaschemas'
import { TSchema, Type } from '@sinclair/typebox'
import { Base } from './base'

function isTSchema (value: unknown): value is TSchema {
  return Object.hasOwnProperty.call(value, '$static')
}

export class RequestBody<T extends TSchema = any> extends Base<typeof S.TRequestBody> implements S.RequestBody {
  description: S.RequestBody['description']
  content!: S.RequestBody['content']
  required: S.RequestBody['required']

  constructor (data: S.RequestBody)
  constructor (schema: T, data?: Partial<S.RequestBody>)
  constructor (value: T | S.RequestBody, data?: Partial<S.RequestBody>) {
    super()
    const requestBody = isTSchema(value)
      ? { ...data, content: { schema: Type.Strict(value), encoding: 'application/json' } }
      : value
    Object.assign(this, requestBody)
  }

  static from<T extends TSchema = any> (data: unknown): RequestBody<T> {
    const parsed = RequestBody.validator.parse(data)
    return new RequestBody(parsed)
  }

  static validator = new Validator(S.TRequestBody)

  $description (description: string): RequestBody<T> {
    return new RequestBody({ ...this.json(), description })
  }

  $required (required = true): RequestBody<T> {
    return new RequestBody({ ...this.json(), required })
  }
}

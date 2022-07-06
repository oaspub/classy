import * as S from '@oaspub/oaschemas'
import { Validator } from '@oaspub/oaschemas'
import { TSchema } from '@sinclair/typebox'
import { Base } from './base'
import { MediaType } from './mediaType'
import { Encoding } from './encoding'

export class RequestBody<
  Content extends Record<string, MediaType> = any
> extends Base<typeof S.TRequestBody> implements S.RequestBody {
  description?: string
  content!: Content
  required?: boolean

  constructor (data: S.RequestBody) {
    super()
    Object.assign(this, data)
  }

  static json<
    T extends TSchema = any
  > (schema: T, data?: Partial<S.RequestBody>): RequestBody<{ 'application/json': MediaType<T> }> {
    const content = { 'application/json': new MediaType({ schema }) }
    return new RequestBody({ ...data, content })
  }

  static from<
    Content extends Record<string, MediaType> = any
  > (data: unknown): RequestBody<Content> {
    const parsed = RequestBody.validator.parse(data)
    return new RequestBody(parsed)
  }

  static validator = new Validator(S.TRequestBody)

  $description (description: string): RequestBody<Content> {
    return new RequestBody({ ...this.json(), description })
  }

  $content<
    M extends string = string,
    T extends TSchema = any,
    Encodings extends Record<string, Encoding> = any
  >(mimeTypeRange: M, ...args: ConstructorParameters<typeof MediaType<T, Encodings>>): RequestBody<Content & { [mimeTypeRange in M]: MediaType<T, Encodings> }> {
    return new RequestBody({
      ...this.json(),
      content: {
        ...this.content,
        [mimeTypeRange]: new MediaType(...args)
      }
    })
  }

  $json<
    T extends TSchema = any,
    Encodings extends Record<string, Encoding> = any
    > (...args: ConstructorParameters<typeof MediaType<T, Encodings>>): RequestBody<Content & { 'application/json': MediaType<T, Encodings> }> {
    return this.$content<'application/json', T, Encodings>('application/json', ...args)
  }

  $required (required = true): RequestBody<Content> {
    return new RequestBody({ ...this.json(), required })
  }
}

import * as S from '@oaspub/oaschemas'
import { Validator } from '@oaspub/oaschemas'
import { TSchema } from '@sinclair/typebox'
import { Link } from './link'
import { Header } from './header'
import { MediaType } from './mediaType'
import { Base } from './base'
import { Encoding } from './encoding'

export class Response<
  Headers extends Record<string, Header> = any,
  Content extends Record<string, MediaType> = any,
  Links extends Record<string, Link> = any
> extends Base<typeof S.TResponse> implements S.Response {
  description!: string
  headers?: Headers
  content?: Content
  links?: Links

  constructor (data: S.Response)
  constructor (description: string, content?: Content, data?: Partial<S.Response>)
  constructor (value: string | S.Response, content?: Content, data?: Partial<S.Response>) {
    super()
    const response = typeof value === 'string'
      ? {
          ...data,
          description: value,
          content
        }
      : value
    Object.assign(this, response)
  }

  static from<
    Headers extends Record<string, Header> = any,
    Content extends Record<string, MediaType> = any,
    Links extends Record<string, Link> = any
  > (data: unknown): Response<Headers, Content, Links> {
    const parsed = Response.validator.parse(data)
    return new Response(parsed)
  }

  static json<
    T extends S.Schema,
    Headers extends Record<string, Header> = any,
    Content extends Record<string, MediaType> = any,
    Links extends Record<string, Link> = any
  > (description: string, schema?: T, data?: Partial<S.Response>): Response<Headers, Content & { 'application/json': T }, Links> {
    return new Response({
      ...data,
      description,
      content: { 'application/json': { schema } }
    })
  }

  static validator = new Validator(S.TResponse)

  $description (description: string): Response<Headers, Content, Links> {
    return new Response({ ...this.json(), description })
  }

  $header<T extends TSchema, P extends string> (name: P, ...args: ConstructorParameters<typeof Header>): Response<Headers & { [prop in P]: Header<T> }, Content, Links> {
    const headers = {
      ...this.headers,
      [name]: new Header(...args)
    }
    return new Response({ ...this.json(), headers })
  }

  $content<
    P extends string,
    T extends TSchema = any,
    Encodings extends Record<string, Encoding> = any,
    Headers extends Record<string, Header> = any,
    Content extends Record<string, MediaType> = any,
    Links extends Record<string, Link> = any
    >(mimeTypeRange: P, ...args: ConstructorParameters<typeof MediaType<T, Encodings>>): Response<Headers, Content & { [mimeTypeRange in P]: MediaType<T, Encodings> }, Links> {
    const content = {
      ...this.content,
      [mimeTypeRange]: new MediaType(...args)
    }
    return new Response({ ...this.json(), content })
  }

  $json<
    T extends TSchema,
    Headers extends Record<string, Header> = any,
    Encodings extends Record<string, Encoding> = any,
    Content extends Record<string, MediaType> = any,
    Links extends Record<string, Link> = any
  > (...args: ConstructorParameters<typeof MediaType<T, Encodings>>): Response<Headers, Content & { ['application/json']: MediaType<T, Encodings> }, Links> {
    return this.$content<'application/json', T, Encodings, Headers, Content, Links>('application/json', ...args)
  }

  $link<P extends string> (name: P, ...args: ConstructorParameters<typeof Link>): Response<Headers, Content, Links & { [prop in P]: S.Link}> {
    const links = {
      ...this.links,
      [name]: new Link(...args)
    }
    return new Response({ ...this.json(), links })
  }
}

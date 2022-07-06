import * as S from '@oaspub/oaschemas'
import { Validator } from '@oaspub/oaschemas'
import { Response } from './response'
import { Parameter } from './parameter'
import { TSchema } from '@sinclair/typebox'
import { Tag } from './tag'
import { ExternalDocumentation } from './externalDocumentation'
import { RequestBody } from './requestBody'
import { PathItem } from './pathItem'
import { Server } from './server'
import { Base } from './base'
import { Header } from './header'
import { MediaType } from './mediaType'
import { Link } from './link'

export class Operation<
  Parameters extends Parameter[] = any,
  ReqBody extends RequestBody = any,
  Responses extends Record<string, Response> = any,
  Callbacks extends Record<string, PathItem> = any
  > extends Base<typeof S.TOperation> implements S.Operation {
  tags?: string[]
  summary?: string
  description?: string
  externalDocs?: ExternalDocumentation
  operationId?: string
  parameters?: Parameters
  requestBody?: ReqBody
  responses?: Responses
  callbacks?: Callbacks
  deprecated?: boolean
  security?: S.SecurityRequirement[]
  servers?: Server[]

  constructor (data?: S.Operation) {
    super()
    Object.assign(this, data)
  }

  static from<
    Parameters extends Parameter[] = any,
    ReqBody extends RequestBody = any,
    Responses extends Record<string, Response> = any,
    Callbacks extends Record<string, PathItem> = any
  >(data: unknown): Operation<Parameters, ReqBody, Responses, Callbacks> {
    const parsed = Operation.validator.parse(data)
    return new Operation(parsed)
  }

  static validator = new Validator(S.TOperation)

  $tag (item: Tag): this
  $tag (name: string): this
  $tag (value: string | Tag): Operation<Parameters, ReqBody, Responses, Callbacks> {
    const tags = []
    if (this.tags != null) tags.push(...this.tags)
    tags.push(value instanceof Tag ? value.name : value)
    return new Operation({ ...this.json, tags })
  }

  $summary (summary: string): Operation<Parameters, ReqBody, Responses, Callbacks> {
    return new Operation({ ...this.json(), summary })
  }

  $description (description: string): Operation<Parameters, ReqBody, Responses, Callbacks> {
    return new Operation({ ...this.json(), description })
  }

  $externalDocs (...args: ConstructorParameters<typeof ExternalDocumentation>): Operation<Parameters, ReqBody, Responses, Callbacks> {
    return new Operation({ ...this.json(), externalDocs: new ExternalDocumentation(...args) })
  }

  $operationId (operationId: string): Operation<Parameters, ReqBody, Responses, Callbacks> {
    return new Operation({ ...this.json(), operationId })
  }

  $deprecated (deprecated = true): Operation<Parameters, ReqBody, Responses, Callbacks> {
    return new Operation({ ...this.json(), deprecated })
  }

  $parameter<T extends TSchema = any>(...args: ConstructorParameters<typeof Parameter>): Operation<[...Parameters, Parameter<T>], ReqBody, Responses, Callbacks> {
    const parameters = [
      ...this.parameters ?? [],
      new Parameter(...args)
    ]
    return new Operation({ ...this.json(), parameters })
  }

  $header<T extends TSchema> (name: S.Parameter['name'], schema?: T, data?: Partial<S.Parameter>): Operation<[...Parameters, Parameter<T>], ReqBody, Responses, Callbacks> {
    return this.$parameter(name, 'header', { schema, ...data })
  }

  $query<T extends TSchema> (name: S.Parameter['name'], schema?: T, data?: Partial<S.Parameter>): Operation<[...Parameters, Parameter<T>], ReqBody, Responses, Callbacks> {
    return this.$parameter(name, 'query', { schema, ...data })
  }

  $path<T extends TSchema> (name: S.Parameter['name'], schema?: T, data?: Partial<S.Parameter>): Operation<[...Parameters, Parameter<T>], ReqBody, Responses, Callbacks> {
    return this.$parameter(name, 'path', { schema, ...data })
  }

  $cookie<T extends TSchema> (name: S.Parameter['name'], schema?: T, data?: Partial<S.Parameter>): Operation<[...Parameters, Parameter<T>], ReqBody, Responses, Callbacks> {
    return this.$parameter(name, 'cookie', { schema, ...data })
  }

  $body<T extends TSchema> (...args: ConstructorParameters<typeof RequestBody>): Operation<Parameters, RequestBody<T>, Responses, Callbacks> {
    const requestBody = new RequestBody(...args)
    return new Operation({ ...this.json(), requestBody })
  }

  $response<
    P extends string,
    Headers extends Record<string, Header> = any,
    Content extends Record<string, MediaType> = any,
    Links extends Record<string, Link> = any
  >(statusCode: P, ...args: ConstructorParameters<typeof Response>): Operation<Parameters, ReqBody, Responses & { [code in P]: Response<Headers, Content, Links> }, Callbacks> {
    const responses = {
      ...this.responses,
      [statusCode]: new Response(...args)
    }
    return new Operation({ ...this.json(), responses })
  }

  $callback<P extends string> (expression: string, ...args: ConstructorParameters<typeof PathItem>): Operation<Parameters, ReqBody, Responses, Callbacks & { [code in P]: PathItem }> {
    const callbacks = {
      ...this.callbacks,
      [expression]: new PathItem(...args)
    }
    return new Operation({ ...this.json(), callbacks })
  }

  $securityRequirement (name: string, values: string[]): Operation<Parameters, ReqBody, Responses, Callbacks> {
    const security = [...this.security ?? [], { [name]: values }]
    return new Operation({ ...this.json(), security })
  }

  $server (...args: ConstructorParameters<typeof Server>): Operation<Parameters, ReqBody, Responses, Callbacks> {
    const servers = [...this.servers ?? [], new Server(...args)]
    return new Operation({ ...this.json(), servers })
  }
}

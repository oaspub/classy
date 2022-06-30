import * as S from '../schemas'
import { Validator } from '../util/validator'
import { TSchema } from '@sinclair/typebox'
import { Header } from './header'
import { Response } from './response'
import { Parameter } from './parameter'
import { RequestBody } from './requestBody'
import { Link } from './link'
import { PathItem } from './pathItem'
import { SecurityScheme } from './securityScheme'
import { Example } from './example'
import { MediaType } from './mediaType'
import { Base } from './base'

export class Components<
  Schemas extends Record<string, TSchema> = any,
  Responses extends Record<string, Response> = any,
  Parameters extends Record<string, Parameter> = any,
  RequestBodies extends Record<string, RequestBody> = any,
  Headers extends Record<string, Header> = any,
  SecuritySchemes extends Record<string, SecurityScheme> = any,
  Links extends Record<string, Link> = any,
  Callbacks extends Record<string, PathItem> = any,
  PathItems extends Record<string, PathItem> = any
> extends Base implements S.Components {
  schemas?: Schemas
  responses?: Responses
  parameters?: Parameters
  requestBodies?: RequestBodies
  headers?: Headers
  securitySchemes?: SecuritySchemes
  links?: Links
  callbacks?: Callbacks
  pathItems?: PathItems
  examples?: Record<string, Example>

  constructor (data?: S.Components) {
    super()
    Object.assign(this, data)
  }

  static from<
    Schemas extends Record<string, TSchema> = any,
    Responses extends Record<string, Response> = any,
    Parameters extends Record<string, Parameter> = any,
    RequestBodies extends Record<string, RequestBody> = any,
    Headers extends Record<string, Header> = any,
    SecuritySchemes extends Record<string, SecurityScheme> = any,
    Links extends Record<string, Link> = any,
    Callbacks extends Record<string, PathItem> = any,
    PathItems extends Record<string, PathItem> = any
  > (data: unknown): Components<Schemas, Responses, Parameters, RequestBodies, Headers, SecuritySchemes, Links, Callbacks, PathItems> {
    const parsed = Components.validator.parse(data)
    return new Components(parsed)
  }

  static validator = new Validator(S.TComponents)

  $schema<B extends string, T extends TSchema> (basename: B, schema: T): Components<Schemas & { [prop in B]: T }, Responses, Parameters, RequestBodies, Headers, SecuritySchemes, Links, Callbacks, PathItems> {
    const schemas = {
      ...this.schemas,
      [basename]: schema
    }
    return new Components({ ...this.json(), schemas })
  }

  $response<
    B extends string,
    Headers extends Record<string, Header>,
    Content extends Record<string, MediaType>,
    Links extends Record<string, Link>
  > (basename: B, ...args: ConstructorParameters<typeof Response>): Components<Schemas, Responses & { [prop in B]: Response<Headers, Content, Links> }, Parameters, RequestBodies, Headers, SecuritySchemes, Links, Callbacks, PathItems> {
    const responses = {
      ...this.responses,
      [basename]: new Response(...args)
    }
    return new Components({ ...this.json(), responses })
  }

  $parameter<B extends string, T extends TSchema> (basename: B, ...args: ConstructorParameters<typeof Parameter>): Components<Schemas, Responses, Parameters & { [prop in B]: Parameter<T> }, RequestBodies, Headers, SecuritySchemes, Links, Callbacks, PathItems> {
    const parameters = {
      ...this.parameters,
      [basename]: new Parameter(...args)
    }
    return new Components({ ...this.json(), parameters })
  }

  $query<B extends string, T extends TSchema> (basename: B, name: S.Parameter['name'], schema?: T, data?: Partial<S.Parameter>): Components<Schemas, Responses, Parameters & { [prop in B]: Parameter<T> }, RequestBodies, Headers, SecuritySchemes, Links, Callbacks, PathItems> {
    return this.$parameter(basename, name, 'query', { schema, ...data })
  }

  $path<B extends string, T extends TSchema> (basename: B, name: S.Parameter['name'], schema?: T, data?: Partial<S.Parameter>): Components<Schemas, Responses, Parameters & { [prop in B]: Parameter<T> }, RequestBodies, Headers, SecuritySchemes, Links, Callbacks, PathItems> {
    return this.$parameter(basename, name, 'path', { schema, ...data })
  }

  $cookie<B extends string, T extends TSchema> (basename: B, name: S.Parameter['name'], schema?: T, data?: Partial<S.Parameter>): Components<Schemas, Responses, Parameters & { [prop in B]: Parameter<T> }, RequestBodies, Headers, SecuritySchemes, Links, Callbacks, PathItems> {
    return this.$parameter(basename, name, 'cookie', { schema, ...data })
  }

  $example (basename: string, ...args: ConstructorParameters<typeof Example>): Components<Schemas, Responses, Parameters, RequestBodies, Headers, SecuritySchemes, Links, Callbacks, PathItems> {
    const examples = { ...this.examples, [basename]: new Example(...args) }
    return new Components({ ...this.json(), examples })
  }

  $body<B extends string, T extends TSchema> (basename: B, ...args: ConstructorParameters<typeof RequestBody>): Components<Schemas, Responses, Parameters, RequestBodies & { [prop in B]: RequestBody<T> }, Headers, SecuritySchemes, Links, Callbacks, PathItems> {
    const requestBodies = {
      ...this.requestBodies,
      [basename]: new RequestBody(...args)
    }
    return new Components({ ...this.json(), requestBodies })
  }

  $header<B extends string, T extends TSchema> (basename: B, ...args: ConstructorParameters<typeof Header>): Components<Schemas, Responses, Parameters, RequestBodies, Headers & { [prop in B]: Header<T> }, SecuritySchemes, Links, Callbacks, PathItems> {
    const headers = {
      ...this.headers,
      [basename]: new Header(...args)
    }
    return new Components({ ...this.json(), headers })
  }

  $securityScheme<B extends string> (basename: B, ...args: ConstructorParameters<typeof SecurityScheme>): Components<Schemas, Responses, Parameters, RequestBodies, Headers, SecuritySchemes & { [prop in B]: SecurityScheme }, Links, Callbacks, PathItems> {
    const securitySchemes = {
      ...this.securitySchemes,
      [basename]: new SecurityScheme(...args)
    }
    return new Components({ ...this.json(), securitySchemes })
  }

  $link<B extends string> (basename: B, ...args: ConstructorParameters<typeof Link>): Components<Schemas, Responses, Parameters, RequestBodies, Headers, SecuritySchemes, Links & { [prop in B]: Link }, Callbacks, PathItems> {
    const links = {
      ...this.links,
      [basename]: new Link(...args)
    }
    return new Components({ ...this.json(), links })
  }

  $callback<B extends string> (basename: B, ...args: ConstructorParameters<typeof PathItem>): Components<Schemas, Responses, Parameters, RequestBodies, Headers, SecuritySchemes, Links, Callbacks & { [prop in B]: PathItem }, PathItems> {
    const callbacks = {
      ...this.callbacks,
      [basename]: new PathItem(...args)
    }
    return new Components({ ...this.json(), callbacks })
  }

  $pathItem<B extends string> (basename: B, ...args: ConstructorParameters<typeof PathItem>): Components<Schemas, Responses, Parameters, RequestBodies, Headers, SecuritySchemes, Links, Callbacks, PathItems & { [prop in B]: PathItem }> {
    const pathItems = {
      ...this.pathItems,
      [basename]: new PathItem(...args)
    }
    return new Components({ ...this.json(), pathItems })
  }
}

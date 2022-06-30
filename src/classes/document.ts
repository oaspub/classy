import * as S from '@oaspub/oaschemas/dist/schemas'
import { Validator } from '@oaspub/oaschemas'
import { Info } from './info'
import { Server } from './server'
import { PathItem } from './pathItem'
import { Tag } from './tag'
import { ExternalDocumentation } from './externalDocumentation'
import { Components } from './components'
import { Base } from './base'
import { TSchema } from '@sinclair/typebox'
import { Response } from './response'
import { Parameter } from './parameter'
import { RequestBody } from './requestBody'
import { Header } from './header'
import { SecurityScheme } from './securityScheme'
import { Link } from './link'

export class Document<
  Paths extends Record<string, PathItem> = any,
  Hooks extends Record<string, PathItem> = any,
  Comps extends Components = any
> extends Base implements S.Document {
  openapi!: string
  info!: Info
  jsonSchemaDialect?: string
  servers?: Server[]
  paths?: Paths
  webhooks?: Hooks
  components?: Comps
  security?: S.SecurityRequirement[]
  tags?: Tag[]
  externalDocs?: ExternalDocumentation

  constructor (data: S.Document)
  constructor (title: string, version: string, data?: S.Document)
  constructor (value: string | S.Document, version?: string, data?: S.Document) {
    super()
    const openapi = typeof value === 'string'
      ? {
          version: '3.1.0', // Default to OAS v3.1.0
          ...data,
          info: {
            ...data?.info,
            title: value,
            version // API version
          }
        }
      : value
    Object.assign(this, openapi)
  }

  static from (value: unknown): Document {
    const parsed = Document.validator.parse(value)
    return new Document(parsed)
  }

  static validator = new Validator(S.TDocument)

  $openapi (version: string): Document<Paths, Hooks, Comps> {
    return new Document({ ...this.json(), version })
  }

  $info (...args: ConstructorParameters<typeof Info>): Document<Paths, Hooks, Comps> {
    return new Document({ ...this.json(), info: new Info(...args) })
  }

  $jsonSchemaDialect (jsonSchemaDialect: string): Document<Paths, Hooks, Comps> {
    return new Document({ ...this.json(), jsonSchemaDialect })
  }

  $server (...args: ConstructorParameters<typeof Server>): Document<Paths, Hooks, Comps> {
    const servers = [...this.servers ?? [], new Server(...args)]
    return new Document({ ...this.json(), servers })
  }

  $path<P extends string, Item extends S.PathItem> (path: P, data?: Item): Document<Paths & { [path in P]: Item }, Hooks, Comps> {
    const paths = { ...this.paths, [path]: new PathItem(data) }
    return new Document({ ...this.json(), paths })
  }

  $webhook<N extends string, Hook extends S.PathItem> (name: N, data?: Hook): Document<Paths, Hooks & { [name in N]: Hook }, Comps> {
    const webhooks = { ...this.webhooks, [name]: new PathItem(data) }
    return new Document({ ...this.json(), webhooks })
  }

  $components<
    Schemas extends Record<string, TSchema> = any,
    Responses extends Record<string, Response> = any,
    Parameters extends Record<string, Parameter> = any,
    RequestBodies extends Record<string, RequestBody> = any,
    Headers extends Record<string, Header> = any,
    SecuritySchemes extends Record<string, SecurityScheme> = any,
    Links extends Record<string, Link> = any,
    Callbacks extends Record<string, PathItem> = any,
    PathItems extends Record<string, PathItem> = any
  >(...args: ConstructorParameters<typeof Components>): Document<Paths, Hooks, Components<Schemas, Responses, Parameters, RequestBodies, Headers, SecuritySchemes, Links, Callbacks, PathItems>> {
    const components = new Components(...args)
    return new Document({ ...this.json(), components })
  }

  $securityRequirement (name: string, values: string[]): Document<Paths, Hooks, Comps> {
    const security = [...this.security ?? [], { [name]: values }]
    return new Document({ ...this.json(), security })
  }

  $tag (...args: ConstructorParameters<typeof Tag>): Document<Paths, Hooks, Comps> {
    const tags = [...this.tags ?? [], new Tag(...args)]
    return new Document({ ...this.json(), tags })
  }

  $externalDocs (...args: ConstructorParameters<typeof ExternalDocumentation>): Document<Paths, Hooks, Comps> {
    return new Document({ ...this.json(), externalDocs: new ExternalDocumentation(...args) })
  }
}

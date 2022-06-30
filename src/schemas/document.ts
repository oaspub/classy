import { Static, Type } from '@sinclair/typebox'
import { regex } from '../util/semver'
import { TInfo } from './info'
import { TServer } from './server'
import { TPathItem } from './pathItem'
import { TComponents } from './components'
import { TSecurityRequirement } from './securityRequirement'
import { TTag } from './tag'
import { TExternalDocumentation } from './externalDocumentation'
import { TReference } from './reference'

export const TDocument = Type.Object({
  openapi: Type.String({ pattern: regex.source, default: '3.1.0' }),
  info: Type.Ref(TInfo),
  jsonSchemaDialect: Type.Optional(Type.String()),
  servers: Type.Optional(Type.Array(Type.Ref(TServer))),
  paths: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(TPathItem)
  ]))),
  webhooks: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(TPathItem)
  ]))),
  components: Type.Optional(Type.Ref(TComponents)),
  security: Type.Optional(Type.Array(Type.Ref(TSecurityRequirement))),
  tags: Type.Optional(Type.Array(Type.Ref(TTag))),
  externalDocs: Type.Optional(Type.Ref(TExternalDocumentation))
}, { $id: 'Document' })

export type Document = Static<typeof TDocument>

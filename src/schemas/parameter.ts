import { Type, Static } from '@sinclair/typebox'
import { TSchema } from './schema'
import { TReference } from './reference'
import { TExample } from './example'

export const TParameterLocation = Type.Union([
  Type.Literal('query'),
  Type.Literal('header'),
  Type.Literal('path'),
  Type.Literal('cookie')
], { $id: 'ParameterLocation' })

export type ParameterLocation = Static<typeof TParameterLocation>

export const TParameterStyle = Type.Union([
  Type.Literal('form'),
  Type.Literal('simple')
], { $id: 'ParameterStyle' })

export type ParameterStyle = Static<typeof TParameterStyle>

export const TParameter = Type.Object({
  name: Type.String(),
  in: Type.Ref(TParameterLocation),
  description: Type.Optional(Type.String()),
  required: Type.Optional(Type.Boolean()),
  deprecated: Type.Optional(Type.Boolean()),
  allowEmptyValue: Type.Optional(Type.Boolean()),
  style: Type.Optional(Type.Ref(TParameterStyle)),
  explode: Type.Optional(Type.Boolean()),
  allowReserved: Type.Optional(Type.Boolean()),
  schema: Type.Optional(Type.Ref(TSchema)),
  example: Type.Optional(Type.Any()),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference),
    Type.Ref(TExample)
  ])))
}, { $id: 'Parameter' })

export type Parameter = Static<typeof TParameter>

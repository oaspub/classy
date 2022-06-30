import { Type, Static } from '@sinclair/typebox'
import { TOauthFlows } from './oauthFlows'

export const TSecuritySchemeType = Type.Union([
  Type.Literal('apiKey'),
  Type.Literal('http'),
  Type.Literal('mutualTLS'),
  Type.Literal('oauth2'),
  Type.Literal('openIdConnect')
], { $id: 'SecuritySchemeType' })

export type SecuritySchemeType = Static<typeof TSecuritySchemeType>

export const TSecurityScheme = Type.Object({
  type: Type.Ref(TSecuritySchemeType),
  description: Type.Optional(Type.String()),
  name: Type.String(),
  in: Type.String(),
  scheme: Type.String(),
  bearerFormat: Type.String(),
  flows: Type.Ref(TOauthFlows),
  openIdConnectUrl: Type.String()
}, { $id: 'SecurityScheme' })

export type SecurityScheme = Static<typeof TSecurityScheme>

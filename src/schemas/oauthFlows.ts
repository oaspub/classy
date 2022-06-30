import { Type, Static } from '@sinclair/typebox'
import { TOauthFlow } from './oauthFlow'

export const TOauthFlowsType = Type.Union([
  Type.Literal('implicit'),
  Type.Literal('password'),
  Type.Literal('clientCredentials'),
  Type.Literal('authorizationCode')
])

export type OauthFlowType = Static<typeof TOauthFlowsType>

export const TOauthFlows = Type.Record(TOauthFlowsType, Type.Ref(TOauthFlow), { $id: 'OauthFlows' })

export type OauthFlows = Static<typeof TOauthFlows>

import { Type, Static } from '@sinclair/typebox'

export const TOauthFlow = Type.Object({
  authorizationUrl: Type.String(),
  tokenUrl: Type.String(),
  refreshUrl: Type.Optional(Type.String()),
  scopes: Type.Record(Type.String(), Type.String())
}, { $id: 'OauthFlow' })

export type OauthFlow = Static<typeof TOauthFlow>

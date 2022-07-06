import * as S from '@oaspub/oaschemas'
import { Validator } from '@oaspub/oaschemas'
import { Base } from './base'

export class OauthFlow extends Base<typeof S.TOauthFlow> implements S.OauthFlow {
  authorizationUrl!: string
  tokenUrl!: string
  refreshUrl?: string
  scopes!: Record<string, string>

  constructor (data: S.OauthFlow) {
    super()
    Object.assign(this, data)
  }

  static from (data: unknown): OauthFlow {
    const parsed = OauthFlow.validator.parse(data)
    return new OauthFlow(parsed)
  }

  static validator = new Validator(S.TOauthFlow)

  $authorizationUrl (authorizationUrl: string): OauthFlow {
    return new OauthFlow({ ...this.json(), authorizationUrl })
  }

  $tokenUrl (tokenUrl: string): OauthFlow {
    return new OauthFlow({ ...this.json(), tokenUrl })
  }

  $refreshUrl (refreshUrl: string): OauthFlow {
    return new OauthFlow({ ...this.json(), refreshUrl })
  }

  $scope (name: string, description: string): OauthFlow {
    const scopes = { ...this.scopes, [name]: description }
    return new OauthFlow({ ...this.json(), scopes })
  }
}

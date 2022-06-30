import * as S from '@oaspub/oaschemas/dist/schemas'
import { Validator } from '@oaspub/oaschemas'
import { OauthFlow } from './oauthFlow'
import { Base } from './base'

export class SecurityScheme extends Base<typeof S.TSecurityScheme> implements S.SecurityScheme {
  type!: S.SecuritySchemeType
  description?: string
  name!: string
  in!: string
  scheme!: string
  bearerFormat!: string
  flows!: Record<S.OauthFlowType, OauthFlow>
  openIdConnectUrl!: string

  constructor (data: S.SecurityScheme) {
    super()
    Object.assign(this, data)
  }

  static from (data: unknown): SecurityScheme {
    const parsed = SecurityScheme.validator.parse(data)
    return new SecurityScheme(parsed)
  }

  static validator = new Validator(S.TSecurityScheme)

  $type (type: S.SecuritySchemeType): SecurityScheme {
    return new SecurityScheme({ ...this.json(), type })
  }

  $description (description: string): SecurityScheme {
    return new SecurityScheme({ ...this.json(), description })
  }

  $name (name: string): SecurityScheme {
    return new SecurityScheme({ ...this.json(), name })
  }

  $in (location: string): SecurityScheme {
    return new SecurityScheme({ ...this.json(), in: location })
  }

  $scheme (scheme: string): SecurityScheme {
    return new SecurityScheme({ ...this.json(), scheme })
  }

  $bearerFormat (bearerFormat: string): SecurityScheme {
    return new SecurityScheme({ ...this.json(), bearerFormat })
  }

  $flow (type: S.OauthFlowType, ...args: ConstructorParameters<typeof OauthFlow>): SecurityScheme {
    const flows = { ...this.flows, [type]: new OauthFlow(...args) }
    return new SecurityScheme({ ...this.json(), flows })
  }

  $openIdConnectUrl (openIdConnectUrl: string): SecurityScheme {
    return new SecurityScheme({ ...this.json(), openIdConnectUrl })
  }
}

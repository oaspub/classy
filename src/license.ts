import * as S from '@oaspub/oaschemas'
import { Validator } from '@oaspub/oaschemas'
import { Base } from './base'

export class License extends Base<typeof S.TLicense> implements S.License {
  name!: string
  identifier?: string
  url?: string

  constructor (data: S.License)
  constructor (name: string, data?: Partial<S.License>)
  constructor (name: string | S.License, data?: Partial<S.License>) {
    super()
    const license: S.License = typeof name === 'string'
      ? { ...data, name }
      : name
    Object.assign(this, license)
  }

  static from (data: S.License): License {
    const parsed = License.validator.parse(data)
    return new License(parsed)
  }

  static validator = new Validator(S.TLicense)

  $name (name: string): License {
    return new License({ ...this.json(), name })
  }

  $identifier (identifier: string): License {
    return new License({ ...this.json(), identifier })
  }

  $url (url: string): License {
    return new License({ ...this.json(), url })
  }
}

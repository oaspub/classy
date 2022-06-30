import * as S from '@oaspub/oaschemas/dist/schemas'
import { Validator } from '@oaspub/oaschemas'
import { Contact } from './contact'
import { License } from './license'
import { Base } from './base'

export class Info extends Base<typeof S.TInfo> implements S.Info {
  title!: string
  summary?: string
  description?: string
  termsOfService?: string
  contact?: Contact
  license?: License
  version!: string

  constructor (data: S.Info)
  constructor (title: string, version: string, data?: Partial<S.Info>)
  constructor (value: string | S.Info, version?: string, data?: Partial<S.Info>) {
    super()
    const info = typeof value === 'string'
      ? {
          ...data,
          title: value,
          version
        }
      : value
    Object.assign(this, info)
  }

  static from (data: unknown): Info {
    const parsed = Info.validator.parse(data)
    return new Info(parsed)
  }

  static validator = new Validator(S.TInfo)

  $title (title: string): Info {
    return new Info({ ...this.json(), title: title })
  }

  $summary (text: string): Info {
    return new Info({ ...this.json(), summary: text })
  }

  $description (text: string): Info {
    return new Info({ ...this.json(), description: text })
  }

  $termsOfService (text: string): Info {
    return new Info({ ...this.json(), termsOfService: text })
  }

  $contact (...args: ConstructorParameters<typeof Contact>): Info {
    return new Info({ ...this.json(), contact: new Contact(...args) })
  }

  $license (...args: ConstructorParameters<typeof License>): Info {
    return new Info({ ...this.json(), license: new License(...args) })
  }

  $version (version: string): Info {
    return new Info({ ...this.json(), version: version })
  }
}

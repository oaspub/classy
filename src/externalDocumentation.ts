import * as S from '@oaspub/oaschemas'
import { Validator } from '@oaspub/oaschemas'
import { Base } from './base'

export class ExternalDocumentation extends Base<typeof S.TExternalDocumentation> implements S.ExternalDocumentation {
  url!: string
  description?: string

  constructor (data: S.ExternalDocumentation) {
    super()
    Object.assign(this, data)
  }

  static from (data: unknown): ExternalDocumentation {
    const parsed = ExternalDocumentation.validator.parse(data)
    return new ExternalDocumentation(parsed)
  }

  static validator = new Validator(S.TExternalDocumentation)

  $url (url: string): ExternalDocumentation {
    return new ExternalDocumentation({ ...this.json(), url })
  }

  $description (description: string): ExternalDocumentation {
    return new ExternalDocumentation({ ...this.json(), description })
  }
}

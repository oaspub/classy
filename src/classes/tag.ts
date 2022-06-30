import * as S from '@oaspub/oaschemas/dist/schemas'
import { Validator } from '@oaspub/oaschemas'
import { ExternalDocumentation } from './externalDocumentation'
import { Base } from './base'

export class Tag extends Base<typeof S.TTag> implements S.Tag {
  name!: string
  description?: string
  externalDoc?: ExternalDocumentation

  constructor (data: S.Tag)
  constructor (name: string, data?: Partial<S.Tag>)
  constructor (value: string | S.Tag, data?: Partial<S.Tag>) {
    super()
    const tag = typeof value === 'string' ? { ...data, name: value } : value
    Object.assign(this, tag)
  }

  static from (data: S.Tag): Tag {
    const parsed = Tag.validator.parse(data)
    return new Tag(parsed)
  }

  static validator = new Validator(S.TTag)

  $name (name: string): Tag {
    return new Tag({ ...this.json(), name })
  }

  $description (description: string): Tag {
    return new Tag({ ...this.json(), description })
  }

  $externalDoc (...args: ConstructorParameters<typeof ExternalDocumentation>): Tag {
    const externalDoc = new ExternalDocumentation(...args)
    return new Tag({ ...this.json(), externalDoc })
  }
}

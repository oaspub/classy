import * as S from '@oaspub/oaschemas/dist/schemas'
import { Validator } from '@oaspub/oaschemas'
import { Base } from './base'
import { Header } from './header'
import { TSchema } from '@sinclair/typebox'

export class Encoding<
  Headers extends Record<string, Header> = any
> extends Base<typeof S.TEncoding> implements S.Encoding {
  contentType?: string
  headers?: Headers
  style?: string
  explode?: boolean
  allowReserved?: boolean

  constructor (data?: S.Encoding) {
    super()
    Object.assign(this, data)
  }

  static from<
    Headers extends Record<string, Header> = any
  > (data: unknown): Encoding<Headers> {
    const parsed = Encoding.validator.parse(data)
    return new Encoding(parsed)
  }

  static validator = new Validator(S.TEncoding)

  $contentType (contentType: string): Encoding {
    return new Encoding({ ...this.json(), contentType })
  }

  $header<N extends string, T extends TSchema>(name: N, ...args: ConstructorParameters<typeof Header>): Encoding<Headers & { [name in N]: T }> {
    const headers = { ...this.headers, [name]: new Header<T>(...args) }
    return new Encoding({ ...this.json(), headers })
  }

  $style (style: string): Encoding {
    return new Encoding({ ...this.json(), style })
  }

  $explode (explode = true): Encoding {
    return new Encoding({ ...this.json(), explode })
  }

  $allowReserved (allowReserved = true): Encoding {
    return new Encoding({ ...this.json(), allowReserved })
  }
}

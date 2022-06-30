import * as S from '../schemas'
import { Validator } from '../util/validator'
import { TSchema } from '@sinclair/typebox'
import { Example } from './example'
import { Encoding } from './encoding'
import { Base } from './base'
import { Header } from './header'

export class MediaType<
  T extends TSchema = any,
  Encodings extends Record<string, Encoding> = any
> extends Base<typeof S.TMediaType> implements S.MediaType {
  schema?: T
  example?: any
  examples?: Record<string, Example>
  encoding?: Encodings

  constructor (data?: S.MediaType)
  constructor (schema?: T, data?: S.MediaType) {
    super()
    const passedInAllData = schema != null && Object.hasOwnProperty.call(schema, 'schema')
    const mediaType = !passedInAllData ? { ...data, schema } : schema
    Object.assign(this, mediaType)
  }

  static from<
    T extends TSchema = any,
    Encodings extends Record<string, Encoding> = any
  >(data: unknown): MediaType<T, Encodings> {
    const parsed = MediaType.validator.parse(data)
    return new MediaType(parsed)
  }

  static validator = new Validator(S.TMediaType)

  $schema<T extends TSchema = any> (schema: T): MediaType<T, Encodings> {
    return new MediaType({ ...this.json(), schema })
  }

  $example (name: string, ...args: ConstructorParameters<typeof Example>): MediaType<T, Encodings> {
    const examples = { ...this.examples, [name]: new Example(...args) }
    return new MediaType(examples)
  }

  $encoding<
    N extends string,
    Headers extends Record<string, Header> = any
  > (name: string, ...args: ConstructorParameters<typeof Encoding>): MediaType<T, Encodings & { [name in N]: Encoding<Headers> }> {
    const encoding = { ...this.encoding, [name]: new Encoding<Headers>(...args) }
    return new MediaType({ ...this.json(), encoding })
  }
}

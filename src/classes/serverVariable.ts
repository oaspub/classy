import * as S from '@oaspub/oaschemas/dist/schemas'
import { Validator } from '@oaspub/oaschemas'
import { Base } from './base'

export class ServerVariable extends Base<typeof S.TServerVariable> implements S.ServerVariable {
  enum?: string[]
  default!: string
  description?: string

  constructor (data: S.ServerVariable)
  constructor (def: string, data?: Partial<S.ServerVariable>)
  constructor (value: string | S.ServerVariable, data?: Partial<S.ServerVariable>) {
    super()
    const serverVariable = { ...data }
    if (typeof value === 'string') {
      serverVariable.default = value
    }
    Object.assign(this, serverVariable)
  }

  static from (data: unknown): ServerVariable {
    const parsed = ServerVariable.validator.parse(data)
    return new ServerVariable(parsed)
  }

  static validator = new Validator(S.TServerVariable)

  $enum (...values: string[]): ServerVariable {
    return new ServerVariable({ ...this.json(), enum: values })
  }

  $default (value: string): ServerVariable {
    return new ServerVariable({ ...this.json(), default: value })
  }

  $description (description: string): ServerVariable {
    return new ServerVariable({ ...this.json(), description })
  }
}

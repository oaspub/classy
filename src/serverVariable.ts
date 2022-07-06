import * as S from '@oaspub/oaschemas'
import { Validator } from '@oaspub/oaschemas'
import { Base } from './base'

export class ServerVariable extends Base<typeof S.TServerVariable> implements S.ServerVariable {
  enum?: string[]
  default!: string
  description?: string

  constructor (data: S.ServerVariable)
  constructor (def: string, data?: Partial<S.ServerVariable>)
  constructor (def: string | S.ServerVariable, data?: Partial<S.ServerVariable>) {
    super()
    const serverVariable = typeof def === 'string'
      ? { ...data, default: def }
      : def
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

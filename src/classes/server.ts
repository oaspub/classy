import * as S from '../schemas'
import { Validator } from '../util/validator'
import { ServerVariable } from './serverVariable'
import { Base } from './base'

export class Server extends Base<typeof S.TServer> implements S.Server {
  url!: string
  description?: string
  variables?: Record<string, ServerVariable>

  constructor (data: S.Server)
  constructor (url: string, data?: Partial<S.Server>)
  constructor (value: string | S.Server, data?: Partial<S.Server>) {
    super()
    const server = { ...data }
    if (typeof value === 'string') {
      server.url = value
    }
    Object.assign(this, server)
  }

  static from (data: unknown): Server {
    const parsed = Server.validator.parse(data)
    return new Server(parsed)
  }

  static validator = new Validator(S.TServer)

  $url (url: string): Server {
    return new Server({ ...this.json(), url })
  }

  $description (description: string): Server {
    return new Server({ ...this.json(), description })
  }

  variable (name: string, data: S.ServerVariable): ServerVariable
  variable (name: string, def: string, data?: Partial<S.ServerVariable>): ServerVariable
  variable (name: string, value: string | S.ServerVariable, data?: Partial<S.ServerVariable>): ServerVariable {
    const serverVariable = typeof value === 'string' ? new ServerVariable(value, data) : new ServerVariable(value)
    if (this.variables == null) {
      this.variables = {}
    }
    this.variables[name] = serverVariable
    return serverVariable
  }
}

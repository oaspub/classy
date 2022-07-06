import * as S from '@oaspub/oaschemas'
import { Validator } from '@oaspub/oaschemas'
import { ServerVariable } from './serverVariable'
import { Base } from './base'

export class Server extends Base<typeof S.TServer> implements S.Server {
  url!: string
  description?: string
  variables?: Record<string, ServerVariable>

  constructor (data: S.Server)
  constructor (url: string, data?: Partial<S.Server>)
  constructor (url: string | S.Server, data?: Partial<S.Server>) {
    super()
    const server: S.Server = typeof url === 'string'
      ? { ...data, url }
      : url
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

  $variable (name: string, ...args: ConstructorParameters<typeof ServerVariable>): Server {
    const server: S.Server = {
      ...this.json(),
      variables: {
        ...this.variables,
        [name]: new ServerVariable(...args)
      }
    }
    return new Server(server)
  }
}

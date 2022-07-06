import * as S from '@oaspub/oaschemas'
import { Validator } from '@oaspub/oaschemas'
import { Server } from './server'
import { Base } from './base'

export class Link<
  Params extends Record<string, any> = any,
  Body = any
> extends Base<typeof S.TLink> implements S.Link {
  operationRef?: string
  operationId?: string
  parameters?: Params
  requestBody?: Body
  description?: string
  server?: Server

  constructor (data?: S.Link) {
    super()
    Object.assign(this, data)
  }

  static from (data: unknown): Link {
    const parsed = Link.validator.parse(data)
    return new Link(parsed)
  }

  static validator = new Validator(S.TLink)

  $operationRef (operationRef: string): Link<Params, Body> {
    return new Link({ ...this.json(), operationRef })
  }

  $operationId (operationId: string): Link<Params, Body> {
    return new Link({ ...this.json(), operationId })
  }

  $parameter<N extends string, T> (name: N, expression: T): Link<Params & { [name in N]: T }, Body> {
    const parameters = { ...this.parameters, [name]: expression }
    return new Link({ ...this.json(), parameters })
  }

  $body<T> (requestBody: T): Link<Params, T> {
    return new Link({ ...this.json(), requestBody })
  }

  $description (description: string): Link<Params, Body> {
    return new Link({ ...this.json(), description })
  }

  $server (...args: ConstructorParameters<typeof Server>): Link<Params, Body> {
    return new Link({ ...this.json(), server: new Server(...args) })
  }
}

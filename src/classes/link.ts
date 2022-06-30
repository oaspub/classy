import * as S from '@oaspub/oaschemas/dist/schemas'
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

  $operationRef (ref: string): this {
    this.operationRef = ref
    return this
  }

  $operationId (id: string): this {
    this.operationId = id
    return this
  }

  $parameter<N extends string, T> (name: N, expression: T): Link<Params & { [name in N]: T }, Body> {
    const parameters = { ...this.parameters, [name]: expression }
    return new Link({ ...this.json(), parameters })
  }

  $body<T> (requestBody: T): Link<Params, T> {
    return new Link({ ...this.json(), requestBody })
  }

  $description (text: string): this {
    this.description = text
    return this
  }

  $server (...args: ConstructorParameters<typeof Server>): Link<Params, Body> {
    return new Link({ ...this.json(), server: new Server(...args) })
  }
}

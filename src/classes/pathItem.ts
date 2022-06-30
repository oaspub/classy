import * as S from '@oaspub/oaschemas/dist/schemas'
import { Validator } from '@oaspub/oaschemas'
import { Operation } from './operation'
import { Server } from './server'
import { Parameter } from './parameter'
import { TSchema } from '@sinclair/typebox'
import { Base } from './base'

export class PathItem<
  Params extends Parameter[] = any,
  Ops extends Record<S.Method, Operation> = any
> extends Base implements S.PathItem {
  summary?: string
  description?: string
  servers?: Server[]
  parameters?: Params
  get?: Ops['get']
  put?: Ops['put']
  post?: Ops['post']
  delete?: Ops['delete']
  options?: Ops['options']
  head?: Ops['head']
  patch?: Ops['patch']
  trace?: Ops['trace']

  constructor (data?: S.PathItem) {
    super()
    Object.assign(this, data)
  }

  static from<
    Params extends Parameter[] = any,
    Ops extends Record<S.Method, Operation> = any
  > (data: unknown): PathItem<Params, Ops> {
    const parsed = PathItem.validator.parse(data)
    return new PathItem(parsed)
  }

  static validator = new Validator(S.TPathItem)

  $summary (summary: string): PathItem<Params, Ops> {
    return new PathItem({ ...this.json(), summary })
  }

  $description (description: string): PathItem<Params, Ops> {
    return new PathItem({ ...this.json(), description })
  }

  $server (data: S.Server): PathItem<Params, Ops>
  $server (url: string, data?: Partial<S.Server>): PathItem<Params, Ops>
  $server (value: string | S.Server, data?: Partial<S.Server>): PathItem<Params, Ops> {
    const servers = [this.servers ?? [], typeof value === 'string' ? new Server(value, data) : new Server(value)]
    return new PathItem({ ...this.json(), servers })
  }

  $parameter<T extends TSchema = any>(...args: ConstructorParameters<typeof Parameter>): PathItem<[...Params, Parameter<T>], Ops> {
    const parameters = [...this.parameters ?? [], new Parameter<T>(...args)]
    return new PathItem({ ...this.json(), parameters })
  }

  $query<T extends TSchema = any>(...[name, schema, data]: Parameters<typeof Parameter.query>): PathItem<[...Params, Parameter<T>], Ops> {
    return this.$parameter(name, 'query', { ...data, ...schema != null && { schema } })
  }

  $header<T extends TSchema = any>(...[name, schema, data]: Parameters<typeof Parameter.header>): PathItem<[...Params, Parameter<T>], Ops> {
    return this.$parameter(name, 'header', { ...data, ...schema != null && { schema } })
  }

  $path<T extends TSchema = any>(...[name, schema, data]: Parameters<typeof Parameter.path>): PathItem<[...Params, Parameter<T>], Ops> {
    return this.$parameter(name, 'path', { ...data, ...schema != null && { schema } })
  }

  $cookie<T extends TSchema = any>(...[name, schema, data]: Parameters<typeof Parameter.cookie>): PathItem<[...Params, Parameter<T>], Ops> {
    return this.$parameter(name, 'cookie', { ...data, ...schema != null && { schema } })
  }

  $operation<
    Method extends S.Method = any,
    Op extends S.Operation = any
  >(method: Method, data?: Op): PathItem<Params, Ops & { [method in Method]: Op }> {
    return new PathItem({ ...this.json(), [method]: new Operation(data) })
  }

  $get<Op extends S.Operation = any> (data?: Op): PathItem<Params, Ops & { get: Op }> {
    return this.$operation('get', data)
  }

  $put<Op extends S.Operation = any> (data?: Op): PathItem<Params, Ops & { put: Op }> {
    return this.$operation('put', data)
  }

  $post<Op extends S.Operation = any> (data?: Op): PathItem<Params, Ops & { post: Op }> {
    return this.$operation('post', data)
  }

  $delete<Op extends S.Operation = any> (data?: Op): PathItem<Params, Ops & { delete: Op }> {
    return this.$operation('delete', data)
  }

  $options<Op extends S.Operation = any> (data?: Op): PathItem<Params, Ops & { options: Op }> {
    return this.$operation('options', data)
  }

  $head<Op extends S.Operation = any> (data?: Op): PathItem<Params, Ops & { head: Op }> {
    return this.$operation('head', data)
  }

  $patch<Op extends S.Operation = any> (data?: Op): PathItem<Params, Ops & { patch: Op }> {
    return this.$operation('patch', data)
  }

  $trace<Op extends S.Operation = any> (data?: Op): PathItem<Params, Ops & { trace: Op }> {
    return this.$operation('trace', data)
  }
}

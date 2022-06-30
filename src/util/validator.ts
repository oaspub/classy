import { Static, TSchema } from '@sinclair/typebox'
import Ajv, { ValidateFunction } from 'ajv/dist/2019'
import { register } from './register'

export class Validator<T extends TSchema> {
  public readonly validate: ValidateFunction<Static<T>>
  constructor (
    public readonly schema: T,
    private readonly ajv = new Ajv()
  ) {
    register(this.ajv)
    this.validate = this.ajv.compile(schema)
  }

  parse (data: unknown, errorMessage?: string): Static<T> {
    this.validate(data)
    if (this.validate.errors != null && this.validate.errors.length > 0) {
      throw new AjvError(this.validate.errors, errorMessage)
    }
    return data
  }
}

export class AjvError extends Error {
  constructor (public readonly validations: ValidateFunction['errors'], message?: string) {
    message = message !== undefined ? `AJV Error: ${message}` : 'AJV Error'
    super(message)
  }
}

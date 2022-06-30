import addFormats from 'ajv-formats'
import Ajv from 'ajv/dist/2019'
import * as OAS from '../../src/schemas'

export function register (ajv = new Ajv()): Ajv {
  ajv
    .addKeyword('kind')
    .addKeyword('modifier')
  addFormats(ajv, [
    'date-time',
    'time',
    'date',
    'email',
    'hostname',
    'ipv4',
    'ipv6',
    'uri',
    'uri-reference',
    'uuid',
    'uri-template',
    'json-pointer',
    'relative-json-pointer',
    'regex'
  ])
  const schemas = Object.values(OAS).filter(value => Object.hasOwnProperty.call(value, '$id'))
  ajv.addSchema(schemas)
  return ajv
}

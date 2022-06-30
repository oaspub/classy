import { Base } from '../../src/classes/base'

class ExtendedBase extends Base {
  foo = 'bar'

  method (): void {}
}

let extended: ExtendedBase

beforeAll(() => {
  extended = new ExtendedBase()
})

test('output pure json from class instance', () => {
  expect(extended.json()).toEqual({ foo: 'bar' })
})

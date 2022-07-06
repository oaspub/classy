import * as S from '@oaspub/oaschemas'
import { Validator } from '@oaspub/oaschemas'
import { Base } from './base'

export class Contact extends Base implements S.Contact {
  name?: string
  url?: string
  email?: string

  constructor (data?: S.Contact) {
    super()
    Object.assign(this, data)
  }

  static from (data: S.Contact): Contact {
    const parsed = Contact.validator.parse(data)
    return new Contact(parsed)
  }

  static validator = new Validator(S.TContact)

  $name (name: string): Contact {
    return new Contact({ ...this.json(), name })
  }

  $url (url: string): Contact {
    return new Contact({ ...this.json(), url })
  }

  $email (email: string): Contact {
    return new Contact({ ...this.json(), email })
  }
}

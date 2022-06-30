import { Type, Static } from '@sinclair/typebox'
import { TContact } from './contact'
import { TLicense } from './license'
import { regex } from '../util/semver'

export const TInfo = Type.Object({
  title: Type.String(),
  summary: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  termsOfService: Type.Optional(Type.String()),
  contact: Type.Optional(Type.Ref(TContact)),
  license: Type.Optional(Type.Ref(TLicense)),
  version: Type.String({ pattern: regex.source })
}, { $id: 'Info' })

export type Info = Static<typeof TInfo>

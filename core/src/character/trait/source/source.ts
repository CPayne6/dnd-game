import { ItemName } from '../../../item/item'
import { BackgroundName } from '../../background'
import { ClassName } from '../../classes'
import { FeatName } from '../../feat'
import { RaceName } from '../../race'

export const traitSources = ['background', 'class', 'feat', 'item', 'race',]

export type SourceName = []

export interface BackgroundSource {
  name: 'background',
  type: BackgroundName
}

export interface ClassSource {
  name: 'class',
  type: ClassName
}

export interface FeatSource {
  name: 'feat',
  type: FeatName
}

export interface ItemSource {
  name: 'item',
  type: ItemName
}

export interface RaceSource {
  name: 'race',
  type: RaceName
}

export interface OtherSource {
  name: 'other',
  type: string
}

export type Source = BackgroundSource | ClassSource | FeatSource | ItemSource | RaceSource | OtherSource
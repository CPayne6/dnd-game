import { AbilityModifier } from "../modifier";
import { Source } from "./source";

type Effect = {
  type: 'modifier',
  options: {}
} | 

export interface Trait {
  source: Source
  effect: Effect

  modifier: AbilityModifier
  effects: any[]
  description: string
  properties: any[]
}

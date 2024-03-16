import { AbilityModifier } from "../modifier";
import { Source } from "./source";

export class Trait {
  source: Source
  modifier: AbilityModifier
  effects: any[]
  description: string

  constructor(){
    
  }
}

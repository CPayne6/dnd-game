import { AbilityScore } from "./properties/ability-score"
import { SavingThrow, Skills } from './properties'
import { Trait } from "../trait/trait"
import { Creature } from '../creature/creature'

interface CharacterArgs {
  scores: AbilityScore,
  skills: Skills,
  savingThrows: SavingThrow
}

export class Character extends Creature {
  readonly name: string
  readonly skills: Skills
  readonly savingThrows: SavingThrow
  readonly traits: Trait[]


  constructor(name: string, args?: CharacterArgs) {
    super(name, {})
    this.name = name
    this.abilityScores = args?.scores ?? new AbilityScore()
    this.skills = args?.skills ?? new Skills()
    this.savingThrows = args?.savingThrows ?? new SavingThrow()
  }


}


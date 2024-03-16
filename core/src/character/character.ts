import { AbilityScore } from "./properties/ability-score"
import { SavingThrow, Skills } from './properties'
import { Trait } from "./trait/trait"

interface CharacterArgs {
  scores: AbilityScore,
  skills: Skills,
  savingThrows: SavingThrow
}

export class Character {
  readonly name: string
  readonly abilityScores: AbilityScore
  readonly skills: Skills
  readonly savingThrows: SavingThrow
  readonly items: null
  readonly traits: Trait[]


  constructor(name: string, args?: CharacterArgs) {
    this.name = name
    this.abilityScores = args?.scores ?? new AbilityScore()
    this.skills = args?.skills ?? new Skills()
    this.savingThrows = args?.savingThrows ?? new SavingThrow()
  }

  getInitiativeModifier() {
    return this.abilityScores.toModifiers().modifiers.dex
  }

  getPassivePerception() {

  }
}



import { SkillName } from '../properties/skills'
import { AbilityName } from '../properties/ability-score'
import * as defaults from './creature-defaults'
import { roller } from '../roller'

interface CreatureOptions {
  speed: number
  languages: string[]
  inspiration: boolean
  maxHp: number
  currHp: number
  tempHp: number
  levels: string[]
  damageEffects: {
    type: string,
    effect: 'resistant' | 'immune' | 'vulnerable'
  }[]

  // TODO: replace with classes
  abilityScores?: Record<AbilityName, number>
  skillProficiencies?: Record<SkillName, boolean>
  savingThrowProficiencies?: Record<AbilityName, boolean>

  passivePerceptionBase?: number
  armorClassOverride?: number
  armorClassBase?: number

  // TODO: replace with class
  traits: []
}

export abstract class Creature {

  protected name: string

  protected speed: number
  protected languages: string[]
  protected inspiration: boolean

  protected maxHp: number
  protected tempHp: number
  protected currHp: number

  protected abilityScores: Record<AbilityName, number>
  protected skillProficiencies: Record<SkillName, boolean>
  protected savingThrowProficiencies: Record<AbilityName, boolean>
  // TODO: replace with damage type instead of string
  protected damageEffects: {
    type: string,
    effect: 'resistant' | 'immune' | 'vulnerable'
  }[]

  protected traits: []

  protected passivePerceptionBase: number
  protected armorClassOverride: number | null
  protected armorClassBase: number

  constructor(name: string, options: CreatureOptions) {
    this.name = name

    this.speed = options.speed | defaults.defaultMovementSpeed
    this.languages = options.languages || ['common']
    this.inspiration = !!options.inspiration

    this.maxHp = options.maxHp
    this.tempHp = options.tempHp
    this.currHp = options.currHp

    // TODO: replace with classes
    this.abilityScores = options.abilityScores ?? {}
    this.skillProficiencies = options.skillProficiencies ?? {}
    this.savingThrowProficiencies = options.savingThrowProficiencies ?? {}

    this.damageEffects = options.damageEffects

    this.passivePerceptionBase = options.passivePerceptionBase ?? defaults.defaultPassivePerceptionBase
    this.armorClassOverride = options.armorClassOverride ?? null
    this.armorClassBase = options.armorClassBase ?? defaults.defaultArmorClassBase

    // TODO: replace with classes
    this.traits = []
  }

  // Math.ceil(options.levels.length / 4) + 1
  abstract getProficiencyBonus(): number

  getPassivePerception() {
    return this.scoreToModifier(this.abilityScores.wis) + this.passivePerceptionBase
  }

  rollInitiative() {
    // Iterate through traits and compile initiative modifier

    // Add with dex and roll
    return this.scoreToModifier(this.abilityScores.dex) + roller.rollD20()
  }

  getArmorClass() {
    // TODO: Calculate AC Modifiers from traits

    // See if there is an override (ie tortle or other)
    if (this.armorClassOverride !== null) {
      return this.armorClassOverride
    }

    // Calculate using Dex and base, take into account heavy armor limitations and medium armor limitations
    return this.armorClassBase + this.scoreToModifier(this.abilityScores.dex)
  }

  getActions() {
    // Iterate through traits and equipment and compile those that have actions
  }

  scoreToModifier(score: number) {
    return Math.floor(score / 2) - 5
  }

  /**
   * Deal damage to this creature and apply resistances, immunities and vulnerabilities
   */
  applyDamage(quantity: number, type: string) {
    let amount = quantity;
    const damageEffect = this.damageEffects.find((e) => e.type === type)?.effect

    switch (damageEffect) {
      case 'immune':
        amount = 0
        break
      case 'resistant':
        amount /= 2
        break
      case 'vulnerable':
        amount *= 2
        break
    }

    // TODO: make some special logic for necrotic damage

    this.currHp -= amount
    return amount
  }

}

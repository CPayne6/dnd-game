import { AbilityModifier } from "../../modifier"

export const abilitiesList = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const

export type AbilityName = typeof abilitiesList[number]

export type Abilities = Record<AbilityName, number>

export class AbilityScore {
  abilities: Abilities

  constructor(initAbilities?: Abilities) {
    this.abilities = initAbilities ?? {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10
    }
  }

  forEach(cb: (score: number, name: AbilityName) => void) {
    abilitiesList.forEach((name) => cb(this.abilities[name], name))
  }

  private scoreToModifier(score: number) {
    return Math.floor(score / 2) - 5
  }

  /**
   * Convert this ability score into its set of modifiers
   * 
   * Accepts other modifiers to effect ability score modifiers()
   */
  toModifiers(baseScoreMods?: AbilityModifier[], modifierBonuses?: AbilityModifier[]) {
    const initModifier = new AbilityModifier()
    this.forEach((score, name) => {
      let baseScoreMod = 0
      if (Array.isArray(baseScoreMods)) {
        baseScoreMods.forEach((tmpScoreMods) => {
          baseScoreMod += tmpScoreMods.get(name)
        })
      }
      initModifier.set(name, this.scoreToModifier(score + baseScoreMod))
    })

    // If no other mods provided return ability score modifiers
    if (!modifierBonuses) {
      return initModifier
    }

    modifierBonuses.forEach(mod => {
      initModifier.merge(mod)
    })

    return initModifier
  }
}

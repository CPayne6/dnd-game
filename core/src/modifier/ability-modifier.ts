import { AbilityName, abilitiesList } from '../properties/ability-score'

export interface ModifierProperties<T extends string, K extends Record<T, number>> {
  toModifiers: (baseScoreMods?: AbilityModifier[], modifierBonuses?: AbilityModifier[]) => K
  forEach: (cb: (score: number, name: string) => void) => void
}

export class AbilityModifier {
  modifiers: Record<AbilityName, number>

  constructor(init?: Record<AbilityName, number>) {
    this.modifiers = init ?? {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0
    }
  }

  add(ability: AbilityName, value: number) {
    this.modifiers[ability] += value
  }

  merge(modifier: AbilityModifier) {
    abilitiesList.forEach((name) => this.add(name, modifier.get(name)))
  }

  set(ability: AbilityName, value: number) {
    this.modifiers[ability] = value
  }

  get(ability: AbilityName) {
    return this.modifiers[ability]
  }

  clone() {
    return new AbilityModifier(this.modifiers)
  }

  forEach(cb: (modifier: number, name: AbilityName) => void) {
    abilitiesList.forEach((name) => cb(this.modifiers[name], name))
  }
}

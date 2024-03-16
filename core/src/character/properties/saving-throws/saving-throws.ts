import { AbilityModifier } from "../../modifier";
import { AbilityName } from "../ability-score";

export type SavingThrowProficiencies = Record<AbilityName, boolean>

export class SavingThrow {
  proficiencies: SavingThrowProficiencies

  constructor(proficiencies?: SavingThrowProficiencies) {
    this.proficiencies = proficiencies ?? {
      str: false,
      dex: false,
      con: false,
      int: false,
      wis: false,
      cha: false
    }
  }

  toModifiers(modifiers: AbilityModifier, bonus: number) {
    const initModifiers = modifiers.clone()
    initModifiers.forEach((mod, name) => {
      initModifiers.add(name, bonus)
    })

    return initModifiers
  }
}



const skillsList = [
  'acrobatics',
  'animal_handling',
  'arcana',
  'athletics',
  'deception',
  'history',
  'insight',
  'intimidation',
  'investigation',
  'medicine',
  'perception',
  'performance',
  'persuasion',
  'religion',
  'slight_of_hand',
  'stealth',
  'survival'
] as const

type SkillName = typeof skillsList[number]

export class Skills {
  proficiencies: Record<SkillName, boolean>

  constructor(init?: Record<SkillName, boolean>) {
    this.proficiencies = init ?? {
      acrobatics: false,
      animal_handling: false,
      arcana: false,
      athletics: false,
      deception: false,
      history: false,
      insight: false,
      intimidation: false,
      investigation: false,
      medicine: false,
      perception: false,
      performance: false,
      persuasion: false,
      religion: false,
      slight_of_hand: false,
      stealth: false,
      survival: false
    }
  }

  set(skill: SkillName, value: boolean) {
    this.proficiencies[skill] = value
  }

  toggle(skill: SkillName) {
    this.proficiencies[skill] = !this.proficiencies[skill]
    return this.proficiencies[skill]
  }

  get(skill: SkillName) {
    return this.proficiencies[skill]
  }
}

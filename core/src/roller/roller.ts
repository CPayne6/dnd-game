import { Die } from "./die";

const dice = {
  d4: new Die(4),
  d6: new Die(6),
  d8: new Die(8),
  d10: new Die(10),
  d12: new Die(12),
  d20: new Die(20),
  d100: new Die(100),
}

type DieName = keyof typeof dice

interface RollPayload {
  sides: DieName,
  amount: number,
  type: string
}

interface RollResult {
  die: Die,
  rolls: number[],
  total: number,
  type: string
}

export class Roller {
  roll(diceConfig: RollPayload[]): RollResult[] {
    const results: RollResult[] = []
    for (const dieConfig of diceConfig) {
      const die = dice[dieConfig.sides]
      const rolls: number[] = []

      // Roll the die amount times
      for (let i = dieConfig.amount; i > 0; i--) {
        rolls.push(die.roll())
      }

      results.push({
        die,
        rolls,
        total: rolls.reduce((prev, curr) => prev + curr, 0),
        type: dieConfig.type
      })
    }

    return results
  }

  rollD4() {
    return dice.d4.roll()
  }

  rollD6() {
    return dice.d6.roll()
  }

  rollD8() {
    return dice.d8.roll()
  }

  rollD10() {
    return dice.d10.roll()
  }

  rollD12() {
    return dice.d12.roll()
  }

  rollD20() {
    return dice.d20.roll()
  }

  rollD100() {
    return dice.d100.roll()
  }
}

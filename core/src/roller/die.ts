
/**
 * Simple Die class to get a random dice roll with a variable side count
 */
export class Die {
  sides: number

  constructor(sides: number) {
    this.sides = sides
  }

  roll() {
    return Math.ceil(Math.random() * this.sides)
  }
}

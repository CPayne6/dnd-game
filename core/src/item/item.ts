
export const items = ['shield']

export type ItemName = typeof items[number]

export class Item {
  name: string
  description: string
  weight: number
}


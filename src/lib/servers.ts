export interface Element {
  id: number,
  name: string,
  color: number, // Decimal value of hex code
  description: string,
  creator: string,
  created: number, // Unix timestamp, seconds
}

export type Result = number | null;

export interface Server {
  name(): string,
  element(id: number): Promise<Element>,
  inventory(): Promise<number[]>,
  combine(recipe: number[][]): Promise<Result>,
  found(id: number): Promise<void>, // Add to inventory
  suggest(recipe: number[][], res: Element): Promise<Result>,
  existingSuggestions(recipe: number[][]): Promise<Element[]>,
  creator(): Promise<string>, // Account name
}
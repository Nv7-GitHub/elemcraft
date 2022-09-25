export interface Element {
  id: number,
  name: string,
  color: number, // Decimal value of hex code
  description: string,
  creator: string,
  created: number, // Unix timestamp, seconds
}

export type Result = number | null;

export type Input = {
  placeholder: string,
  type: string,
}

export interface UI {
  progress(text: string, progress: number): void, // progress is 0-1
  prompt(title: string, inputs: Input[], buttons: string[]): Promise<PromptResult>,
}

export interface PromptResult {
  values: string[], // Indexes correspond to inputPlaceholders indexes
  button: number, // Index of button
}

export interface Server {
  connect(ui: UI): Promise<void>,
  name(): string,
  element(id: number): Promise<Element>,
  inventory(): Promise<number[]>,
  combine(recipe: number[][]): Promise<Result>,
  suggest(recipe: number[][], res: Element): Promise<Result>,
  existingSuggestions(recipe: number[][]): Promise<Element[]>,
  canSuggest(recipe: number[][]): boolean,
  creator(): Promise<string>, // Account name
}
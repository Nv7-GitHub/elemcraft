import { writable } from "svelte/store"

export type Element = {
  id: number,
  name: string,
  color: string,
}

export const elements: Element[] = [
  {
    id: 0,
    name: 'Air',
    color: 'rgb(84, 179, 227)',
  },
  {
    id: 1,
    name: 'Earth',
    color: 'rgb(109, 78, 43)',
  },
  {
    id: 2,
    name: 'Fire',
    color: 'rgb(227, 132, 84)',
  },
  {
    id: 3,
    name: 'Water',
    color: 'rgb(84, 117, 227)',
  }
]

export let picked = writable(-1);
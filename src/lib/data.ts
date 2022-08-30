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
    color: '#eaeaea',
  },
  {
    id: 1,
    name: 'Earth',
    color: '#eaeaea',
  },
  {
    id: 2,
    name: 'Fire',
    color: '#eaeaea',
  },
  {
    id: 3,
    name: 'Water',
    color: '#eaeaea',
  }
]

export let picked = writable(-1);
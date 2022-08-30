import { writable, type Writable } from "svelte/store"

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
  },
  {
    id: 4,
    name: 'Mud',
    color: 'rgb(109, 78, 43)',
  },
]

type Recipe = {
  recipe: number[][],
  result: number,
}

export const recipes: Recipe[] = [
  {
    recipe: [
      [3, 3],
      [1, 1]
    ],
    result: 4
  },
];

export let picked = writable(-1);
export let recipe: Writable<number[][]> = writable([[-1]]);
export let ROWS = writable(5);
export let COLS = writable(5);

// Utility
let $ROWS: number;
let $COLS: number;
ROWS.subscribe(v => {$ROWS = v})
COLS.subscribe(v => {$COLS = v})

export function make_picked(): number[][] {
  return [...new Array($ROWS)].map(_ => [...new Array($COLS)].map(__ => -1));
}

// Recipe checking
function cmp_recipes(a: number[][], b: number[][]): boolean {
  if (a.length != b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i].length != b[i].length) {
      return false;
    }
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] != b[i][j]) {
        return false;
      }
    }
  }

  return true;
}

recipe.subscribe((v) => {
  for (let r of recipes) {
    if (cmp_recipes(v, r.recipe)) {
      let newv = make_picked();
      newv[newv.length/2][newv[0].length/2] = r.result;
      recipe.set(newv);
    }
  }
})
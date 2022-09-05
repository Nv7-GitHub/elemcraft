import type { Element, Result, Server } from "$lib/servers";

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

const elements: Element[] = [
  {
    id: 0,
    name: 'Air',
    color: 0x5eb2e3,
    description: 'A gas that is invisible and odorless.',
    creator: 'You',
    created: 0,
  },
  {
    id: 1,
    name: 'Earth',
    color: 0x6d4e2b,
    description: 'A solid that is made of minerals.',
    creator: 'You',
    created: 0,
  },
  {
    id: 2,
    name: 'Fire',
    color: 0xe38454,
    description: 'A gas that is hot and can burn.',
    creator: 'You',
    created: 0,
  },
  {
    id: 3,
    name: 'Water',
    color: 0x5475e3,
    description: 'A liquid that is clear and can be wet.',
    creator: 'You',
    created: 0,
  },
  {
    id: 4,
    name: 'Mud',
    color: 0x6d4e2b,
    description: 'A solid that is made of minerals and water.',
    creator: 'You',
    created: 0,
  },
  {
    id: 5,
    name: 'Wind',
    color: 0x54b3e3,
    description: 'A gas that is invisible and can move things.',
    creator: 'You',
    created: 0,
  },
  {
    id: 6,
    name: 'Dust',
    color: 0xa8a8a8,
    description: 'A solid that is made of minerals and air.',
    creator: 'You',
    created: 0,
  }
]

type Recipe = {
  recipe: number[][],
  result: number,
}

const recipes: Recipe[] = [
  {
    recipe: [
      [3, 3],
      [1, 1]
    ],
    result: 4
  },
  {
    recipe: [
      [0, 0],
      [2, 2]
    ],
    result: 5,
  },
  {
    recipe: [
      [1, 5, 5],
      [1, 1, 5],
      [1, 1, 1],
    ],
    result: 6,
  },
];

export class LocalServer implements Server {
  inv = [0, 1, 2, 3];

  name(): string {
    return "Local Server";
  }
  
  async element(id: number): Promise<Element> {
    return elements[id];
  }

  async inventory(): Promise<number[]> {
    return this.inv;
  }

  async combine(recipe: number[][]): Promise<Result> {
    for (const r of recipes) {
      if (cmp_recipes(r.recipe, recipe)) {
        return r.result;
      }
    }
    return null;
  }

  async found(id: number): Promise<void> {
    this.inv.push(id);
  }

  async suggest(recipe: number[][], res: Element): Promise<Result> {
    res.id = elements.length;
    elements.push(res);
    recipes.push({ recipe, result: res.id });
    return res.id;
  }

  async existingSuggestions(recipe: number[][]): Promise<Element[]> {
    return [];
  }

  async creator(): Promise<string> {
    return "You";
  }
}
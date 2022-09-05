import { writable, type Writable } from "svelte/store"
import type { Server } from "./servers";
import { LocalServer } from "./servers/local";

let $server: Server = new LocalServer();
export let server: Writable<Server> = writable($server);
export let inv = writable([...await $server.inventory()]);
export let picked = writable(-1);
export let recipe: Writable<number[][]> = writable([[-1]]);
export let ROWS = writable(5);
export let COLS = writable(5);

let $inv: number[];
inv.subscribe(v => {$inv = v})
server.subscribe(v => {$server = v})

// Utility
let $ROWS: number;
let $COLS: number;
ROWS.subscribe(v => {$ROWS = v})
COLS.subscribe(v => {$COLS = v})

export function make_picked(): number[][] {
  return [...new Array($ROWS)].map(_ => [...new Array($COLS)].map(__ => -1));
}

recipe.subscribe(async (v) => {
  let res = await $server.combine(v);
  if (res && !$inv.includes(res)) {
    $server.found(res);
    recipe.set(make_picked());
    inv.set([...$inv, res]);
  }
})

export async function refresh_inv() {
  inv.set([...await $server.inventory()]);
}
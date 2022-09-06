import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store"
import type { Server } from "./servers";
import { LocalServer } from "./servers/local";
import { connected, ConnectUI } from "./ui";

export let servers: Server[] = [new LocalServer()];
let $server: Server = servers[0];

export let server: Writable<Server> = writable($server);
export let inv: Writable<number[]> = writable([]);
$server.inventory().then((v) => {inv.set([...v])});

export let picked = writable(-1);
export let recipe: Writable<number[][]> = writable([[-1]]);
export let ROWS = writable(5);
export let COLS = writable(5);

export async function connect() {
  connected.set(false);
  await $server.connect(new ConnectUI());
  connected.set(true);
}

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
  if (res) {
    if (!$inv.includes(res)) {
      $server.found(res);
      inv.set([...$inv, res]);
    }
    recipe.set(make_picked());
  }
})

if (browser) {
  connect();
}

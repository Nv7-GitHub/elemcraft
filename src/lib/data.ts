import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store"
import type { Server } from "./servers";
import { DefaultServer } from "./servers/default";
import { connected, ConnectUI } from "./ui";

export let servers: Server[] = [new DefaultServer()];
let $server: Server = servers[0];

export let server: Writable<Server> = writable($server);
export let inv: Writable<number[]> = writable([]);

export let picked = writable(-1);
export let recipe: Writable<number[][]> = writable([[-1]]);
export let ROWS = writable(5);
export let COLS = writable(5);

export async function connect() {
  let ui = new ConnectUI()
  connected.set(false);
  await $server.connect(ui);
  connected.set(true);
  ui.progress("Getting ready...", 0);
  inv.set([...await $server.inventory()]);
  ui.progress("Ready", 1);
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

if (browser) {
  connect();
}

<script lang="ts">
import { inv, make_picked, recipe, server } from "$lib/data";

import { slide, fade } from "svelte/transition";
import { onMount } from "svelte";
import { suggest_open } from "./suggest";
import type { Element } from "../servers";
import ElementView from "./ElementView.svelte";

let input: HTMLDivElement;

let color = "#ddd";
let description = "";

const MAXLEN = 21;

function checklen(e: Event) {
  if (input.innerText.length >= MAXLEN) {
    e.preventDefault();
    return false;
  }
}

let loading = false;

let existing: Element[] = [];

onMount(async () => {
  existing = await $server.existingSuggestions($recipe);
});

async function suggest() {
  loading = true;
  let res = await $server.suggest($recipe, {
    id: -1,
    name: input.innerText,
    description: description,
    color: parseInt(color.slice(1), 16),
    creator: await $server.creator(),
    created: Math.floor(Date.now() / 1000),
  });
  if (res) { // If found, save
    await $server.found(res);
    recipe.set(make_picked());
    inv.set([...$inv, res]);
  }
  loading = false;
  suggest_open.set(false);
}
</script>

{#if $suggest_open}
  <div class="cover" in:fade out:fade></div>
  <div class="suggest" in:slide out:slide>
    <div class="title">
      <h2>Suggest</h2>
      <button class="titlebtn" on:click={() => {suggest_open.set(false)}}>&times;</button>
    </div>
    
    <div class="body">
      <div class="element" style:background-color={color}>
        <div class="element-input" contenteditable bind:this={input} on:keypress={checklen} on:paste={checklen}>Name</div>
      </div>

      <div class="color-input">
        Color
        <input type="color" bind:value={color}/>
      </div>

      <textarea placeholder="Description..." class="description-input" bind:value={description}></textarea>
    </div>

    {#if existing.length > 0}
    <div class="existing-row">
      <span class="existing-text">Existing Suggestions</span>
      <div class="existing">
        {#each existing as el}
        <div class="existing-item" on:click={() => {
          input.innerText = el.name;
          color = `#${el.color.toString(16)}`;
          description = el.description;
        }}>
          <ElementView el={el}></ElementView>
        </div>
        {/each}
      </div>
    </div>
    {/if}

    <div class="bottom">
      <button class="submit" on:click={suggest} disabled={loading}>Submit</button>
    </div>
  </div>
{/if}

<style>
  .title {
    padding: 0 2vh 0 2vh;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: rgba(0, 0, 0, 0.25);
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .titlebtn {
    border: none;
    background-color: transparent;
    font-size: 200%;
    transition-duration: 0.1s;
    color:rgba(0, 0, 0, 0.5);
  }

  .titlebtn:hover {
    color:rgba(0, 0, 0, 1);
  }

  .body {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .suggest {
    background-color: #fff;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    border-radius: 2.5vh;
    display: flex;
    flex-direction: column;
  }

  .cover {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .element {
    border-radius: 2vh;
    width: 10vh;
    height: 10vh;
    margin: 2vh;
    text-align: center !important;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0.25vh;
    transition-duration: 0.1s;
  }

  .element-input {
    width: 100%;
    border: none;
    background-color: transparent;
  }

  .element-input:focus {
    outline: none;
  }

  .color-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 4vh 0 4vh 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  .description-input {
    margin: 2vh;
    font-family: Arial, Helvetica, sans-serif;
    flex-grow: 1;
  }

  .bottom {
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: right;
    flex-direction: row;
  }
  
  .submit {
    margin: 1vh;
    border-radius: 1vh;
    border-style: solid;
    height: 7vh;
    width: 10vw;
    border-color:rgba(0, 0, 0, 0.25);
    background-color: #ddd;
    transition-duration: 0.1s;
    border-width: 1px;
  }

  .submit:hover {
    background-color: #fff;
    border-width: 5px;
  }

  .existing {
    display: flex;
    flex-direction: row;
    overflow: scroll;
    padding-left: 0.5vh;
    padding-right: 0.5vh;
  }

  .existing-item {
    flex-shrink: 0;
  }

  .existing-row {
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
  }

  .existing-text {
    margin: 0.5vh;
  }
</style>
<script lang="ts">
import { slide, fade } from "svelte/transition";
import { suggest_open } from "./suggest";

let input: HTMLDivElement;

let color: string = "#ddd";

const MAXLEN = 21;
function checklen(e: Event) {
  if (input.innerText.length >= MAXLEN) {
    e.preventDefault();
    return false;
  }
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
        <div class="element-input" contenteditable bind:this={input} on:keypress={checklen} on:paste={checklen}></div>
      </div>

      <div class="color-input">
        Color
        <input type="color" bind:value={color}/>
      </div>

      <textarea placeholder="Description..." class="description-input"></textarea>
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
  }
</style>
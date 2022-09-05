<script lang="ts">
import { component, prompt_result, type ProgressComponent, type PromptComponent } from "$lib/ui";
import { slide } from "svelte/transition";

let progress: ProgressComponent;
let prompt: PromptComponent;
let vals: string[];

component.subscribe((v) => {
  if (v.type == 'progress') {
    progress = v.value as ProgressComponent;
  } else {
    prompt = v.value as PromptComponent;
    vals = new Array(prompt.inputPlaceholders.length).fill('');
  }
})

function submit(ind: number) {
  prompt_result.set({
    values: vals,
    button: ind,
  });
}
</script>

{#if $component.type == 'progress'}
<div class="progress" in:slide out:slide>
  <div class="bg" style:width={(progress.progress * 100) + "%"}>
    <div class="text">
      {progress.text}
    </div>
  </div>
</div>
{:else}
{#if $component.type == 'prompt'}
  <div class="prompt" in:slide out:slide>
    <div class="title">
      <h3 class="title-text">{prompt.title}</h3>
    </div>

    <div class="body">
      {#each prompt.inputPlaceholders as placeholder, i}
        <input type="text" placeholder={placeholder} bind:value={vals[i]} class="input"/>
      {/each}
    </div>

    <div class="btns">
      {#each prompt.buttons as btn, i}
        <button type="button" class="btn" on:click={() => {submit(i)}}>{btn}</button>
      {/each}
    </div>
  </div>
{/if}
{/if}

<style>
  .progress {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    width: 50vw;
    height: 5vh;
    background-color: #ddd;
    border-radius: 10px;
  }

  .text {
    font-family: Arial, Helvetica, sans-serif;
    color: #fff; 
    mix-blend-mode: difference;
    width: 50vw;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bg {
    background-color: #000;
    border-radius: 10px;
    transition-duration: 0.1s;
  }

  .prompt {
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
    font-family: Arial, Helvetica, sans-serif;
  }

  .title {
    padding: 0 2vh 0 2vh;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: rgba(0, 0, 0, 0.25);
  }

  .title-text {
    margin-bottom: 1vh;
    margin-top: 1vh;
  }

  .body {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: rgba(0, 0, 0, 0.25);
    padding-bottom: 1vh;
  }

  .btns {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }

  .btn {
    margin: 1vh;
    border-radius: 1vh;
    border-style: solid;
    height: 5vh;
    width: 10vw;
    border-color:rgba(0, 0, 0, 0.25);
    background-color: #ddd;
    transition-duration: 0.1s;
    border-width: 1px;
  }

  .btn:hover {
    background-color: #fff;
    border-width: 5px;
  }
  
  .input {
    margin: 1vh 1vh 0 1vh;
    padding: 0.5em;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.5);
    border-width: 1px;
    border-radius: 5px;
  }
</style>
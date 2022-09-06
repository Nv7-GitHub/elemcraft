<script lang="ts">
  import { connect, server, servers } from "$lib/data";
  import { ind } from "./topbar";
  import ghlogo from "$lib/assets/github.svg";

  function update() {
    server.set(servers[$ind]);
    connect();
  }
</script>

<div class="top-bar">
  <div class="row">
    <label for="server-select">Server: </label>
    <select bind:value={$ind} on:change={() => {update()}} id="server-select" class="option">
      {#each servers as s, i}
        <option value={i}>{s.name()}</option>
      {/each}
    </select>
  </div>

  <a href="https://github.com/Nv7-GitHub/elemcraft" target="_blank"><img src={ghlogo} alt="Github"></a>
</div>

<style>
  .top-bar {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    font-family: Arial, Helvetica, sans-serif;
    padding: 1vh;
    align-items: end;
  }

  .option {
    border: none;
    background-color: transparent;
  }

  .row {
    margin-bottom: 1vh;
  }
</style>
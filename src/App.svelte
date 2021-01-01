<script lang="ts">
    import Todos from "./Todos.svelte";
    export let appName;
</script>

<style>
    .container {
        max-width: 800px;
        margin: 10px auto;
    }
    .logo {
        display: block;
        margin: 20px auto;
        width: 50%;
    }
</style>

<div class="container">
    <a href="https://codingthesmartway.com" target="_blank"><img
            src={'/assets/svelte-horizontal.png'}
            alt="svelte logo"
            class="logo" /></a>

    <h2>{appName}</h2>
    <Todos />
</div>

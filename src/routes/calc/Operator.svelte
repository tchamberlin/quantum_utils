<script lang="ts">
    export let type = "AND";
</script>

<span class="operator">{#if type === "AND"}&{:else}|{/if}</span>

<style>
    .operator {
        font-size: 2em;
        font-family: monospace;
    }
</style>

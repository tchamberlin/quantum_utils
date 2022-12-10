<script lang="ts">
    import Encounter from './Encounter.svelte';
	import type { Encounter as EncounterType} from '../../types';
    import { EncounterGraph } from '../../tree';

    const encounterGraph = new EncounterGraph(0.7204);
    encounterGraph.addEncounter("or", 0.7204)
    encounterGraph.addEncounter("and", 0.59);
    const nodes = encounterGraph.inOrder();
    console.log("nodes", nodes)
    const result = encounterGraph.postOrder();
</script>

<div class="d-inline-flex justify-content-start bd-highlight">
    {#each nodes as node}
        <span class="prob p-2">
            {#if node.operator}
                {node.operator}
            {:else}
                {node.value}
            {/if}

        </span>
    {/each}
    <span class="prob p-2">
        {result * 100}%
    </span>
</div>

<style>
    .prob {
        border: 1px white solid;
    }
</style>

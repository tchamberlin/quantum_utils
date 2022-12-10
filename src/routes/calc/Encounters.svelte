<script lang="ts">
	import Encounter from './Encounter.svelte';
    import query from '../../results/query';
    import EncounterParser from '../../encounter_parser'

    export let encounters = [];
    console.log("encounters!", encounters)
    let tokens = [];
    let result = 0;
    // $: {
    //     tokens = [];
    //     encounters.forEach(encounter => {
    //         tokens.push({type: "number", literal: query(encounter)}),
    //         tokens.push({type: "|"})
    //     })
    //     tokens = tokens.slice(0, tokens.length - 1);
    //     console.log("tokens", tokens)
    //     const ep = new EncounterParser(tokens);
    //     result = ep.parse_expression();
    //     console.log("result", result)
    // }

</script>


<style>
</style>

<div class="encounter m-1 p-1">
{#each encounters as encounter, i}
    <Encounter encounter={encounter} />
{/each}

</div>

<span class="results" title="{result * 100}%">{Math.round(result * 100)}%</span>

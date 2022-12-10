<script lang="ts">
    import SideSimple from './SideSimple.svelte';
    import query from '../../results/query';
	
    export let encounter;
    let result;
    $: {
        result = query(encounter)
    }
</script>

<div class="encounter d-inline-flex flex-column">
    <div class="d-inline-flex flex-row bd-highlight align-items-center justify-content-center">
        <div class="bd-highlight">
            <SideSimple side={{side: "attacker", ...encounter.attacker}} />
        </div>
        <div class="bd-highlight">
            :
        </div>
        <div class="bd-highlight">
            <SideSimple side={{side: "defender", ...encounter.defender}} />
        </div>

    </div>
    <div class="d-flex flex-row justify-content-center pt-1">
        <span class="results" title="{result * 100}%">{Math.round(result * 100)}%</span>
    </div>
</div>
<style>
    .encounter {
        border: 1px white solid;
        padding:  1em;
    }
    .results {
        /*font-size: 2em;
        font-weight: bolder;*/
        text-align:  center;
    }
</style>

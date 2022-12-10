<script lang="ts">
	import Encounter from './Encounter.svelte';
	import Operator from './Operator.svelte';

    export let encounters = [];
    export let activeEncounterIndex: number;
    export let selectEncounter;
    export let removeEncounter;
    export let operatorType;
    export let toggleOperatorType;
</script>


<style>
    .active-encounter {
        border-color: #375a7f;

    }
    .encounter {
        /* border: 4px solid; */
        border-style: solid;
        border-width: 4px;
        /* background-color: white; */
        padding: 1rem;
        cursor: pointer;
    }
    .inactive-encounter {
        border-color: var(--bs-gray);

    }
    .encounter-close-button {
        display: block;
        float: right;
        position: absolute;
        margin:3px
    }
    .operator {
        cursor: pointer;
    }
</style>

<div class="d-flex flex-row m-1 p-1 align-items-center">
    {#each encounters as encounter, i}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div  class="d-inline-flex flex-column"  >
        <div>
            <button type="button" class="encounter-close-button btn-close btn-sm" aria-label="Close" on:click={() => removeEncounter(i)}></button>
        </div>
        <div class="encounter" class:active-encounter={activeEncounterIndex === i} class:inactive-encounter={activeEncounterIndex !== i} on:click={() => selectEncounter(i)}>
            <Encounter encounter={encounter}/>
        </div>
        
    </div>
    {#if encounters.length > 1 && i !== encounters.length - 1}
        <div class="d-inline-flex flex-column m-2 operator" on:click={toggleOperatorType}>
            <Operator type={operatorType} />
        </div>
    {/if}
    {/each}
</div>

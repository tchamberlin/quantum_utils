<script lang="ts">
    const dice = {
        1: [0,0,0,0,1,0,0,0,0],
        2: [1,0,0,0,0,0,0,0,1],
        3: [1,0,0,0,1,0,0,0,1],
        4: [1,0,1,0,0,0,1,0,1],
        5: [1,0,1,0,1,0,1,0,1],
        6: [1,0,1,1,0,1,1,0,1],
    };

    export let number = null;
    export let side = null;
</script>
<div class={`face ${side === "attacker" ? "attacker-face" : "defender-face"}`}>
    
    {#each dice[number] as isPip}
        {#if isPip}
            <span class={`pip ${side === "attacker" ? "attacker-pip" : "defender-pip"}`}/>
        {:else}
            <span class="no-pip"/>
        {/if}
    {/each}

</div>


<style type="text/css">
    .face {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: center;
        /*margin: 1px;*/
        padding: 2px;
    }

    .attacker-face {
        background-color: var(--bs-dark);
    }

    .defender-face {
        background-color: var(--bs-light);
    }

    .no-pip {
        display: block;
        height: 15px;
        /*margin: 2px;*/

        width: 15px;

    }

    .pip {
        justify-self: center;
        align-self: center;
        border-radius: 50%;
        background-color: var(--bs-light);
        /*box-shadow: inset 0 3px #111, inset 0 -3px #555;*/
        display: block;
        height: 15px;
        width: 15px;
        margin: .2px;
    }

    .defender-pip {
        background-color: var(--bs-dark);
    }

    .attacker-pip {
        background-color: var(--bs-light);
    }
</style>

<script lang="ts">
	import Encounters from './Encounters.svelte';
	import SideEdit from './SideEdit.svelte';
	import query from '../../results/query';

	import { activeEncounter, activeEncounterIndex, encounters, cardData } from '../../stores';

    
    function swapSides() {
        
        const attacker = $activeEncounter["attacker"]
        const defender = $activeEncounter["defender"]
        $encounters[$activeEncounterIndex] = {
            attacker: defender,
            defender: attacker
        }
    }

    function addEncounter() {
        // TODO: this is a dumb way to copy
        $encounters = [...$encounters, JSON.parse(JSON.stringify($activeEncounter))]
        $activeEncounterIndex = $encounters.length - 1
    }
    
    let result: number;
    let cardsAvailableToAttacker: Array<string> = [];
    let cardsAvailableToDefender: Array<string> = [];
    $: {
        cardsAvailableToAttacker = Object.keys($cardData).filter((card: string) => !$activeEncounter.defender.cards.includes(card))
        cardsAvailableToDefender = Object.keys($cardData).filter((card: string) => !$activeEncounter.attacker.cards.includes(card))
        result = query($activeEncounter)
        console.log("$activeEncounter", $activeEncounter)
    }
</script>

<h1>Combat Calculator</h1>

<div class="row">
	<div class="col-lg-9">
		<div class="row align-items-center">
			<div class="col-auto">
				<h3>Attacker ({$activeEncounter["attacker"].name})</h3>
				<SideEdit side="attacker" />
			</div>
			<div class="col-sm-1">
				<div class="d-flex pt-2 justify-content-center">
					<button
                        class="swapper mx-auto btn btn-outline-light"
                        on:click={swapSides}
                        title="Swap attacker/defender"
                    >
                        ⇄
                    </button>
				</div>
			</div>
			<div class="col-sm-5">
				<h3>Defender ({$activeEncounter["defender"].name})</h3>
				<SideEdit side="defender" />
			</div>
		</div>
	</div>
	<div class="col-lg-3">
		<h3>Attacker's odds of victory</h3>
        <div class="row">
            <span class="results" title="{result * 100}%">{Math.round(result * 100)}%</span>
        </div>
		<div class="row">
            <button class="btn btn-primary" on:click={addEncounter}>Add Encounter</button>
        </div>    
	</div>
</div>
<hr>
<div class="row">
    <Encounters encounters={$encounters} />
</div>


<style>
	.swapper {
		font-size: 1.25em;
        font-weight: bolder;
		text-align: center;
	}

    .results {
        font-size: 2em;
        font-weight: bolder;
		text-align: center;
    }
</style>

<script lang="ts">
	import Encounter from '$lib/Header/Encounter.svelte';
	import Side from './Side.svelte';
	import query from '../../results/query';

	import { quantumCards, activeEncounter } from '../../stores';

	function onCardDragStart(event, cardItem) {
		console.log('onCardDragStart', event);
		event.dataTransfer.setData('text/plain', cardItem.value);
	}

	function onShipClick(ship) {}

	function handleAddEncounter() {
		encounters = [
			...encounters,
			{ attackerShip: $activeEncounter.attackerShip, defenderShip: $activeEncounter.defenderShip }
		];
	}

	function swapSides() {
		console.log('$activeEncounter was', $activeEncounter);
		const { attackerShip, defenderShip, attackerCards, defenderCards } = $activeEncounter;
		$activeEncounter = {
			attackerShip: defenderShip,
			defenderShip: attackerShip,
			attackerCards: [...defenderCards],
			defenderCards: [...attackerCards]
		};
		$quantumCards = Object.values($quantumCards).reduce((prev, card) => {
			if (card.owned) {
				if (card.owned === 'Attacker') {
					card.owned = 'Defender';
				} else if (card.owned === 'Defender') {
					card.owned = 'Attacker';
				}
			}
			return { ...prev, [card.value]: { ...card } };
		}, {});
	}

	// function swapSides() {
	//     console.log("$activeEncounter was", $activeEncounter)
	//     const {attackerShip, defenderShip, attackerCards, defenderCards} = $activeEncounter;
	//     $activeEncounter.attackerShip = defenderShip;
	//     $activeEncounter.defenderShip = attackerShip;
	//     $activeEncounter.attackerCards = [...defenderCards];
	//     $activeEncounter.defenderCards = [...attackerCards];
	//     console.log("$activeEncounter now", $activeEncounter)
	// }

	let result = null;
	let encounters = [];
	$: {
		$activeEncounter.attackerCards = Object.values($quantumCards)
			.filter(({ owned }) => owned == 'Attacker')
			.map((card) => card.value);
		$activeEncounter.defenderCards = Object.values($quantumCards)
			.filter(({ owned }) => owned == 'Defender')
			.map((card) => card.value);
		result = query({
			attackerShip: $activeEncounter.attackerShip,
			defenderShip: $activeEncounter.defenderShip,
			attackerHand: $activeEncounter.attackerCards,
			defenderHand: $activeEncounter.defenderCards
		});
	}
</script>

<h1>Combat Calculator</h1>

<div class="row">
	<div class="col-xs-11">
		<div class="row align-items-center">
			<div class="col-sm-5">
				<h2>Attacker</h2>
				<Side side="Attacker" diceKey="attackerShip" />
			</div>
			<div class="col-sm-1">
				<div class="d-flex pt-2 justify-content-center">
					<button class="mx-auto btn btn-outline-light btn-small" on:click={swapSides}>⇄</button>
				</div>
			</div>
			<div class="col-sm-5">
				<h2>Defender</h2>
				<Side side="Defender" diceKey="defenderShip" />
			</div>
		</div>
	</div>
	<div class="col-xs-1">
		<h2>Results</h2>
		<span>{Math.round(result * 100)}%</span>
		<button class="btn btn-primary" on:click={handleAddEncounter}>Add Encounter</button>
	</div>
</div>
<div class="row">
	{#each encounters as { attackerShip, defenderShip }}
		<Encounter {attackerShip} {defenderShip} />
	{/each}
</div>

<style>
	/* :global(.dice-group > *) {
        margin: .25rem;
    } */

	.quantum-cards :first-child {
		margin-left: 0;
	}

	.quantum-cards :last-child {
		margin-right: 0;
	}

	.quantum-cards > * {
		margin: 0.25rem;
		padding: 0.25rem;
		cursor: grab;
	}

	.quantum-card {
		border: white 1px solid;
	}

	.swapper {
		font-size: 2em;
		text-align: center;
	}
</style>

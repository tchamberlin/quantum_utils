<!-- drag and drop will still be really useful for the re-ordering of encounters? -->
<script lang="ts">
	import { ListGroupItem } from 'sveltestrap/src';

	import { cardData, encounters, activeEncounterIndex } from '../../stores';

	type CardState = {
		value: string;
		label: string;
		active: boolean;
		disabled: boolean;
	};

	function onClickCard(cardState: CardState) {
		if (!cardState.active) {
			if ($encounters[$activeEncounterIndex][side].cards.length < 3 && !cardState.disabled) {
				$encounters[$activeEncounterIndex][side].cards = [
					...$encounters[$activeEncounterIndex][side].cards,
					cardState.value
				];
			}
		} else {
			$encounters[$activeEncounterIndex][side].cards = $encounters[$activeEncounterIndex][
				side
			].cards.filter((card) => card !== cardState.value);
		}
	}

	function isDisabled(card) {
		return (
			!$encounters[$activeEncounterIndex][side].cards.includes(card.value) &&
			($encounters[$activeEncounterIndex][
				side === 'attacker' ? 'defender' : 'attacker'
			].cards.includes(card.value) ||
				$encounters[$activeEncounterIndex][side].cards.length >= 3)
		);
	}

	let cardsState: { [key: string]: CardState };
	$: {
		cardsState = Object.values($cardData).reduce(
			(prev, card) => ({
				...prev,
				[card.label]: {
					value: card.value,
					label: card.label,
					active: $encounters[$activeEncounterIndex][side].cards.includes(card.value),
					disabled: isDisabled(card)
				}
			}),
			{}
		);
	}

	$: {
		console.log(
			'$encounters[$activeEncounterIndex][side]',
			$encounters[$activeEncounterIndex][side]
		);
		console.log('cardsState', cardsState);
	}
	export let side: string;
</script>

<!-- TODO: would probably be better to ditch the drag/drop and do a modal-ish thing instead. click to toggle to selection screen. no actual modal though, just in place? -->

<div class="grid-container">
	{#each Object.values(cardsState) as cardState}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="quantum-card" on:click={() => onClickCard(cardState)}>
			<ListGroupItem
				active={cardState.active}
				disabled={cardState.disabled}
				class="small-list-item"
			>
				{cardState.label}
			</ListGroupItem>
		</div>
	{/each}
</div>

<style>
	.quantum-card {
		cursor: pointer;
	}

	.grid-container {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: left;
	}

	.grid-container > * {
		text-align: center;
	}

	:global(.small-list-item) {
		padding: 0.25rem;
	}
</style>

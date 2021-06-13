<!-- drag and drop will still be really useful for the re-ordering of encounters? -->
<script lang="ts">
	import { ListGroup, ListGroupItem } from 'sveltestrap';

	import { quantumCards } from '../../stores';

	function handleCardClick(clickedCard) {
		if (clickedCard.owned === null) {
			if (ownedCards < 3) {
				clickedCard.owned = side;
			}
		} else if (clickedCard.owned === side) {
			clickedCard.owned = null;
		}

		$quantumCards = { ...$quantumCards, [clickedCard.value]: clickedCard };
		console.log('$quantumCards', $quantumCards);
	}

	let ownedCards = 0;
	$: {
		ownedCards = Object.values($quantumCards).filter((card) => card.owned === side).length;
	}
	export let side: string;

	console.log('side', side);
</script>

<!-- TODO: would probably be better to ditch the drag/drop and do a modal-ish thing instead. click to toggle to selection screen. no actual modal though, just in place? -->


<div class="grid-container">
	{#each Object.values($quantumCards) as card}
		<div class="quantum-card" on:click={() => handleCardClick(card)}>
			<ListGroupItem
				active={card.owned === side}
				disabled={(card.owned !== side && card.owned !== null) || ownedCards >= 3}
				class="small-list-item"
			>
				{card.label}
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

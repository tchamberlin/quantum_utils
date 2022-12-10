<script lang="ts">
	import { ListGroup, ListGroupItem } from 'sveltestrap';
	import Die from './Die.svelte';

    import { activeEncounterIndex, encounters } from '../../stores';

	import { diceInfo } from '../../constants';
    export let side: string;
</script>

<div class="grid-container">
	{#each Object.entries(diceInfo) as [number, { alt, imagePath }]}
		<div class="ship" on:click={() => ($encounters[$activeEncounterIndex][side].ship = Number(number))}>
			<ListGroupItem active={$encounters[$activeEncounterIndex][side].ship === Number(number)} class="p-1">
				<Die number={number} side={side} />
			</ListGroupItem>
		</div>
	{/each}
</div>

<style>
	.ship {
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
</style>

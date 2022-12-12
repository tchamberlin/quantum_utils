<script lang="ts">
	import { ListGroupItem } from 'sveltestrap/src';
	import Die from './Die.svelte';

	import { activeEncounterIndex, encounters } from '../../stores';

	import { diceInfo } from '../../constants';
	export let side: string;
</script>

<div class="grid-container">
	{#each Object.entries(diceInfo) as [number, { alt, imagePath }]}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => ($encounters[$activeEncounterIndex][side].ship = Number(number))}
			class="ship"
		>
			<ListGroupItem
				active={$encounters[$activeEncounterIndex][side].ship === Number(number)}
				class={`${!($encounters[$activeEncounterIndex][side].ship === Number(number)) && (side === "defender" ? "bg-secondary" : "bg-secondary")} p-1`}
			>
				<Die {number} {side} />
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

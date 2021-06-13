<script lang="ts">
	import { activeEncounter } from '../../stores';

	import { ListGroup, ListGroupItem } from 'sveltestrap';

	import { diceInfo } from '../../constants';
	export let diceKey: string;
	console.log('ShipSelect key', diceKey);
</script>

<div class="grid-container">
	{#each Object.entries(diceInfo) as [number, { alt, imagePath }]}
		<div class="ship" on:click={() => ($activeEncounter[diceKey] = Number(number))}>
			<ListGroupItem active={$activeEncounter[diceKey] === Number(number)} class="p-1">
				<img class="die-image" src={imagePath} {alt} />
			</ListGroupItem>
		</div>
	{/each}
</div>

<style>
	.die-image {
		font-size: 1.5em;
		width: 1.5em;
		height: 1.5em;
	}
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

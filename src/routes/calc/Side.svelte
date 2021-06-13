<script lang="ts">
	import CardsSelect from './CardsSelect.svelte';
	import DiceSelect from './ShipSelect.svelte';

	export let diceKey: string;
	export let side: string;
</script>

<div class="d-flex justify-content-between">
	<div class="px-1">
		<CardsSelect {side} />
	</div>
	<div class="px-1">
		<DiceSelect {diceKey} />
	</div>
</div>

<style>
</style>

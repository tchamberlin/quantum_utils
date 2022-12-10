<script lang="ts">
	import CardsSelect from './CardsSelect.svelte';
	import ShipSelect from './ShipSelect.svelte';

    export let side: string;
</script>

<div class="d-flex">
	<div class="px-2">
		<CardsSelect {side} />
	</div>
	<div class="px-2">
		<ShipSelect {side} />
	</div>
</div>

<style>
</style>

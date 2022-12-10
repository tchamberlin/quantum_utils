<script lang="ts">
	import { ListGroup, ListGroupItem } from 'sveltestrap';

    export let side;
	import Die from './Die.svelte';
	import { diceInfo } from '../../constants';

</script>

		<Die number={side.ship} side={side.side} />

<style>
	.die-image {
		font-size: 1.5em;
		width: 1.5em;
		height: 1.5em;
	}
	.attacker {
		background-color: var(--bs-dark);
		color: var(--bs-light);
	}
	.defender {
		background-color: var(--bs-light);
		color: var(--bs-dark);
	}
</style>

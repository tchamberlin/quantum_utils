<script lang="ts">
    export let side;
	import Die from './Die.svelte';
</script>

<Die number={side.ship} side={side.side} />


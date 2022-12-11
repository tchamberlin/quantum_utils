<script lang="ts">
	import SideSimple from './SideSimple.svelte';
	import { calculateOddsForEncounter } from '../../results/query';

	export let encounter;
	let result;
	$: {
		result = calculateOddsForEncounter(encounter);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="d-inline-flex flex-column">
	<div class="d-inline-flex flex-row bd-highlight align-items-center justify-content-center">
		<div class="bd-highlight">
			<SideSimple side={{ side: 'attacker', ...encounter.attacker }} />
		</div>
		<div class="attack-symbol bd-highlight">
			<span>&#8758;</span>
			<!-- Ratio symbol -->
		</div>
		<div class="bd-highlight">
			<SideSimple side={{ side: 'defender', ...encounter.defender }} />
		</div>
	</div>
	<div class="d-flex flex-row justify-content-center pt-1">
		<span class="results" title="{result * 100}%">{Math.round(result * 100)}%</span>
	</div>
</div>

<style>
	.results {
		/*font-size: 2em;
        font-weight: bolder;*/
		text-align: center;
	}
	.attack-symbol {
		text-align: center;
		font-size: 3em;
	}
</style>

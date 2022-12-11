<script lang="ts">
	import Encounters from './Encounters.svelte';
	import SideEdit from './SideEdit.svelte';
	import { calculateOddsForEncounter, calculateOddsForEncounters } from '../../results/query';

	import {
		activeEncounter,
		activeEncounterIndex,
		encounters,
		cardData,
		operatorType,
		attackerCards,
		defenderCards
	} from '../../stores';

	import { page } from '$app/stores';
	import { goto } from "$app/navigation";
	import { onMount } from 'svelte';
	import type { Encounter } from 'src/types';

	const SIDE_DELIMETER = "∶"
	const ENCOUNTER_DELIMETER = "→"
	const CARD_SET_START = "["
	const CARD_SET_DELIMETER = "·"
	const CARD_SET_END = "]"

	function parseSimpleEncounterString(encounterString: string, attackerCards: string[], defenderCards: string[]): Encounter {
		const [attackerShip, defenderShip] = encounterString.split(SIDE_DELIMETER);

		return {
			attacker: {
				name: 'You',
				ship: Number(attackerShip),
				cards: attackerCards
			},
			defender: {
				name: 'Them',
				ship: Number(defenderShip),
				cards: defenderCards
			}
		}
	}

	function splitUrlParam(param: string | null, delimiter: string): string[] {
		if (param === null) {
			return []
		}
		return param.split(delimiter);
	}

	function searchParamsToEncounterStrings(searchParams: URLSearchParams) {
		return {
			attackerCards: splitUrlParam(searchParams.get("ac"), CARD_SET_DELIMETER),
			defenderCards: splitUrlParam(searchParams.get("dc"), CARD_SET_DELIMETER),
			encounters: splitUrlParam(searchParams.get("es"), ENCOUNTER_DELIMETER),
			operator: searchParams.get("op") || "OR"
		}
	}
	

	function parseAdvancedSideSpec(sideSpec: string) {
		// Chop off the "close set" notation, then split on the start of the card set
		const [shipStr, cardsSet] = sideSpec.slice(0, -1).split(CARD_SET_START)
		const ship = Number(shipStr)
		const cards = cardsSet.split(CARD_SET_DELIMETER)

		return {ship, cards}
	}

	function parseAdvancedEncounterString(encounterString: string): Encounter {
		const [attackerSpec, defenderSpec] = encounterString.split(SIDE_DELIMETER)
		const { ship: attackerShip, cards: attackerCards } = parseAdvancedSideSpec(attackerSpec)
		const { ship: defenderShip, cards: defenderCards } = parseAdvancedSideSpec(defenderSpec)
		return {
			attacker: {
				name: 'You',
				ship: attackerShip,
				cards: attackerCards
			},
			defender: {
				name: 'Them',
				ship: Number(defenderShip),
				cards: defenderCards
			}
		}
	}

	function renderUrlEncounterString(encounters: Encounters, advanced: boolean) {
		console.log("renderUrlEncounterString advanced?", advanced, "encounters", encounters)
		let encounterStrings: string[];
		if (advanced) {
			encounterStrings = encounters.map((encounter: Encounter) => {
				const attackerCardsStr = encounter.attacker.cards.map((card)=>$cardData[card].abbreviation).join(CARD_SET_DELIMETER)
				const attackerSideStr = `${encounter.attacker.ship}${CARD_SET_START}${attackerCardsStr}${CARD_SET_END}`
				const defenderCardsStr = encounter.defender.cards.map((card)=>$cardData[card].abbreviation).join(CARD_SET_DELIMETER)
				const defenderSideStr = `${encounter.defender.ship}${CARD_SET_START}${defenderCardsStr}${CARD_SET_END}`
				const es = `${attackerSideStr}${SIDE_DELIMETER}${defenderSideStr}`
				return es
			});
		} else {
			encounterStrings = encounters.map((encounter: Encounter) => (`${encounter.attacker.ship}${SIDE_DELIMETER}${encounter.defender.ship}`));
		}
		return encounterStrings
	}

	function updateUrl(encounters: Encounters, operatorType: string, advanced: boolean) {
		const url = new URL($page.url)
		const encounterStrings = renderUrlEncounterString(encounters, advanced)
		url.searchParams.set("es", encounterStrings.join(ENCOUNTER_DELIMETER))
		// if (encounters[0].attacker.cards.length > 0) {
		if (!advanced) {
			url.searchParams.set("ac", encounters[0].attacker.cards.join(CARD_SET_DELIMETER))
			url.searchParams.set("dc", encounters[0].defender.cards.join(CARD_SET_DELIMETER))
		}
		url.searchParams.set("op", operatorType)
		if (advanced) {
			url.searchParams.set("advanced", "true")
			url.searchParams.delete("ac")
			url.searchParams.delete("dc")
		} else {
			url.searchParams.delete("advanced")
		}
		goto(url)
	}

	let advancedMode = false
	function toggleAdvancedMode() {
		// When advancedMode is turned on, per-battle cards must be converted to per-encounter cards
		// That is, each encounter must have its cards set to the value of the per-battle cards for that side
		if (advancedMode) {
			console.log("advanced mode on", $attackerCards, $defenderCards)
			$encounters = $encounters.map((encounter: Encounter) => ({
				attacker: {...encounter.attacker, cards: $attackerCards},
				defender: {...encounter.defender, cards: $defenderCards},
			}))
			console.log("advanced $encounters", $encounters)
		} else {
			console.log("advanced mode OFF")

		}
		advancedMode = !advancedMode
	}

	
	// Indicate that the component onMount() has been completed
	let hasMounted = false;
	// Load encounters from URL params ONCE, when component is initially mounted
	onMount(() => {
		let encounterSpec = searchParamsToEncounterStrings($page.url.searchParams)
		if (encounterSpec.encounters.length > 0) {
			$encounters = encounterSpec.encounters.map(encounterString=> {
				if (encounterSpec.attackerCards.length > 0 || encounterSpec.defenderCards.length > 0) {
					return parseSimpleEncounterString(encounterString, encounterSpec.attackerCards, encounterSpec.defenderCards)
				} else {
					return parseAdvancedEncounterString(encounterString)
				}
			});
		}
		$operatorType = encounterSpec.operator
		console.log("Calc encounters", encounterSpec)
		hasMounted = true
	})

	function swapSides() {
		const attacker = $activeEncounter['attacker'];
		const defender = $activeEncounter['defender'];
		$encounters[$activeEncounterIndex] = {
			attacker: defender,
			defender: attacker
		};
	}

	function addEncounter() {
		// TODO: this is a dumb way to copy
		$encounters = [...$encounters, JSON.parse(JSON.stringify($activeEncounter))];
		$activeEncounterIndex = $encounters.length - 1;
	}
	function removeEncounter(index: number) {
		if ($encounters.length === 1) {
			return;
		}
		// TODO: this is a dumb way to copy
		$encounters = [...$encounters.slice(0, index), ...$encounters.slice(index + 1)];
		$activeEncounterIndex =
			$activeEncounterIndex >= index ? $activeEncounterIndex - 1 : $activeEncounterIndex;
		console.log('removeEncounter', $encounters, $activeEncounterIndex);
	}

	function selectEncounter(index: number) {
		console.log(`selectEncounter: activeEncounter was ${activeEncounterIndex}; now ${index}`);
		$activeEncounterIndex = index;
	}

	function toggleOperatorType() {
		const to = $operatorType === 'AND' ? 'OR' : 'AND';
		console.log(`toggleOperatorType to ${to}`);
		$operatorType = to;
	}

	let oddsForCurrentEncounter: number;
	let oddsForAllEncounters: number;
	let cardsAvailableToAttacker: Array<string> = [];
	let cardsAvailableToDefender: Array<string> = [];
	$: {
		cardsAvailableToAttacker = Object.keys($cardData).filter(
			(card: string) => !$activeEncounter.defender.cards.includes(card)
		);
		cardsAvailableToDefender = Object.keys($cardData).filter(
			(card: string) => !$activeEncounter.attacker.cards.includes(card)
		);
		oddsForCurrentEncounter = calculateOddsForEncounter($activeEncounter);
		oddsForAllEncounters = calculateOddsForEncounters($encounters, $operatorType);
	}

	$: {
		console.log("Setting URL?", hasMounted)
		if (hasMounted) {
			console.log("Setting URL from encounter store", $encounters)
			updateUrl($encounters, $operatorType, advancedMode)

		}
	}

	$: {
		console.log("$attackerCards", $attackerCards, "$defenderCards", $defenderCards)
	}
</script>

<div class="row align-items-center">
	<div class="col-auto"><h1>Combat Calculator</h1></div>
	<div class="col-auto">
		<div class="form-check form-switch">
			<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" on:click={() => toggleAdvancedMode()}>
			<label class="form-check-label" for="flexSwitchCheckDefault">
				{#if advancedMode}
				<b>Advanced Mode</b>
				{:else}
				Advanced Mode
				{/if}
			</label>
		</div>
	</div>

</div>


<div class="row">
	<div class="col-lg-9">
		<div class="row align-items-center">
			<div class="col-lg-5">
				<h3>Attacker ({$activeEncounter['attacker'].name})</h3>
				<SideEdit side="attacker" />
			</div>
			<div class="col-lg-1">
				<div class="d-flex pt-2 justify-content-center">
					<button
						class="swapper mx-auto btn btn-outline-light"
						on:click={swapSides}
						title="Swap attacker/defender"
					>
						⇄
					</button>
				</div>
			</div>
			<div class="col-lg-5">
				<h3>Defender ({$activeEncounter['defender'].name})</h3>
				<SideEdit side="defender" />
			</div>
		</div>
	</div>
</div>
<hr />
<Encounters
	encounters={$encounters}
	activeEncounterIndex={$activeEncounterIndex}
	{selectEncounter}
	{removeEncounter}
	operatorType={$operatorType}
	{toggleOperatorType}
/>
<button class="btn btn-primary" on:click={addEncounter}>Add Encounter</button>

<div>
	<span class="results-text">
		Probability of winning {$operatorType === 'OR' ? 'at least one encounter' : 'all encounters'}:
	</span>
</div>

<div>
	<span class="results" title="{oddsForAllEncounters * 100}%f">
		{Math.round(oddsForAllEncounters * 100)}%
	</span>
</div>

<style>
	.swapper {
		font-size: 1.25em;
		font-weight: bolder;
		text-align: center;
	}
	.results-text {
		font-size: 1.25em;
	}
	.results {
		font-size: 2em;
		font-weight: bolder;
		text-align: center;
	}
</style>

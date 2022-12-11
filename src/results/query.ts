import all_data from '.';

export function calculateOddsForEncounter({ attacker, defender }) {
	const attackerAdvantageKey = JSON.stringify(attacker.ship - defender.ship);
	const attackerHandKey = attacker.cards.sort().join('|');
	const defenderHandKey = defender.cards.sort().join('|');
	const attackerWinRatio = all_data[attackerAdvantageKey][attackerHandKey][defenderHandKey];

	console.log('query', attacker, defender, attackerWinRatio);
	return attackerWinRatio;
}

function calcAnd(encounters) {
	let result = calculateOddsForEncounter(encounters[0]);
	encounters.slice(1).forEach((encounter) => {
		result = result * calculateOddsForEncounter(encounter);
	});
	return result;
}

function calcOr(encounters) {
	let result = 1 - calculateOddsForEncounter(encounters[0]);
	encounters.slice(1).forEach((encounter) => {
		result = result * (1 - calculateOddsForEncounter(encounter));
	});
	return 1 - result;
}
export function calculateOddsForEncounters(encounters, operatorType: string) {
	if (operatorType === 'AND') {
		return calcAnd(encounters);
	} else if (operatorType === 'OR') {
		return calcOr(encounters);
	} else {
		throw new Error(`Invalid operatorType: ${operatorType}`);
	}
}

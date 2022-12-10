import all_data from '.';

const queryResults = ({ attacker, defender }) => {
	console.log("query", attacker, defender)
	const attackerAdvantageKey = JSON.stringify(attacker.ship - defender.ship);
	const attackerHandKey = attacker.cards.sort().join('|');
	const defenderHandKey = defender.cards.sort().join('|');
	const attackerWinRatio = all_data[attackerAdvantageKey][attackerHandKey][defenderHandKey];

	return attackerWinRatio;
};

export default queryResults;

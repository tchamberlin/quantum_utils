import all_data from '.';

const queryResults = ({ attackerShip, defenderShip, attackerHand, defenderHand }) => {
	console.log('queryResults', attackerShip, attackerHand);
	const attackerAdvantageKey = JSON.stringify(attackerShip - defenderShip);
	const attackerHandKey = attackerHand.sort().join('|');
	const defenderHandKey = defenderHand.sort().join('|');
	const attackerWinRatio = all_data[attackerAdvantageKey][attackerHandKey][defenderHandKey];

	return attackerWinRatio;
};

export default queryResults;

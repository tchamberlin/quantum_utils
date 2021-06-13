export interface Card {
	label: string;
	value: string;
	description: string;
	owned: string;
	advantage: number;
}

export interface Encounter {
	attackerShip: number;
	defenderShip: number;
	attackerCards: Array<string>;
	defenderCards: Array<string>;
}

// (card.owned !== side && card.owned !== null) || ownedCards >= 3

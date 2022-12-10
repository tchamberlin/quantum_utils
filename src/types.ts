export interface Card {
	label: string;
	value: string;
	description: string;
	owned: string;
	advantage: number;
}

// (card.owned !== side && card.owned !== null) || ownedCards >= 3

export interface Ship {
    value: number;
    name: string;
    description: string;
}

export interface Player {
    name: string;
    ship: number;
    cards: Array<string>;
}

export interface Encounter {
    attacker: Player;
    defender: Player;
}

export type Encounters = Array<Encounter>;

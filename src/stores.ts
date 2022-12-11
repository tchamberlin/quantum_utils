import { readable, writable, derived, type Writable } from 'svelte/store';
import { cardItems } from './constants';

import type { Card, Encounter } from './types';

const _quantumCards: { [card: string]: Card } = cardItems.reduce(
	(prev, current) => ({ ...prev, [current.value]: { ...current, owned: null } }),
	{}
);
export const quantumCards = writable(_quantumCards);

const _defaultEncounter: Encounter = {
	attacker: {
		name: 'You',
		ship: 1,
		cards: []
	},
	defender: {
		name: 'Them',
		ship: 1,
		cards: []
	}
};

export const encounters = writable([_defaultEncounter]);

export const activeEncounterIndex = writable(0);
export const operatorType = writable('OR');
export const activeEncounter = derived(
	[activeEncounterIndex, encounters],
	([$activeEncounterIndex, $encounters]) => $encounters[$activeEncounterIndex]
);

const _defaultCards: string[] = [];
export const attackerCards = writable(_defaultCards)
export const defenderCards = writable(_defaultCards)

const _cardData = {
	ferocious: {
		value: 'ferocious',
		label: 'Ferocious',
		abbreviation: 'F',
		description: '-1 combat bonus',
		advantage: -1
	},
	relentless: {
		value: 'relentless',
		label: 'Relentless',
		abbreviation: 'Rs',
		description: 'Optionally re-roll your combat die once'
	},
	cruel: {
		value: 'cruel',
		label: 'Cruel',
		abbreviation: 'C',
		description: "Optionally re-roll your opponent's combat die once"
	},
	scrappy: {
		value: 'scrappy',
		label: 'Scrappy',
		abbreviation: 'Sy',
		description: 'On your turn, optionally re-roll your combat die once'
	},
	strategic: {
		value: 'strategic',
		label: 'Strategic',
		abbreviation: 'Sc',
		description: '-2 combat bonus if adjacent to another of you ships',
		advantage: -2
	},
	rational: {
		value: 'rational',
		label: 'Rational',
		abbreviation: 'Rl',
		description: 'Your combat die always rolls to 3'
	},
	stubborn: {
		value: 'stubborn',
		label: 'Stubborn',
		abbreviation: 'Sn',
		description: 'As defender, break ties (and destroy your attacker if they lose)'
	}
};
export const cardData = readable(_cardData);

const _shipData = {
	1: { value: 1, name: 'Battlestation', description: '' },
	2: { value: 2, name: 'Flagship', description: '' },
	3: { value: 3, name: 'Destroyer', description: '' },
	4: { value: 4, name: 'Frigate', description: '' },
	5: { value: 5, name: 'Interceptor', description: '' },
	6: { value: 6, name: 'Scout', description: '' }
};
export const shipData = readable(_shipData);

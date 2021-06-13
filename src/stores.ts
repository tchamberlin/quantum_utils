import { writable } from 'svelte/store';
import { cardItems } from './constants';

import type { Card, Encounter } from './types';

const _quantumCards: { [card: string]: Card } = cardItems.reduce(
	(prev, current) => ({ ...prev, [current.value]: { ...current, owned: null } }),
	{}
);
export const quantumCards = writable(_quantumCards);

const _initialEncounter: Encounter = {
	attackerShip: 1,
	defenderShip: 1,
	attackerCards: [],
	defenderCards: []
};
export const activeEncounter = writable(_initialEncounter);

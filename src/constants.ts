import type { Ship } from './types';

export const cardItems = [
	{
		value: 'ferocious',
		label: 'Ferocious',
		description: '-1 combat bonus',
		advantage: -1
	},
	{
		value: 'relentless',
		label: 'Relentless',
		description: 'Optionally re-roll your combat die once'
	},
	{
		value: 'cruel',
		label: 'Cruel',
		description: "Optionally re-roll your opponent's combat die once"
	},
	{
		value: 'scrappy',
		label: 'Scrappy',
		description: 'On your turn, optionally re-roll your combat die once'
	},
	{
		value: 'strategic',
		label: 'Strategic',
		description: '-2 combat bonus if adjacent to another of you ships',
		advantage: -2
	},
	{
		value: 'rational',
		label: 'Rational',
		description: 'Your combat die always rolls to 3'
	},
	{
		value: 'stubborn',
		label: 'Stubborn',
		description: 'As defender, break ties (and destroy your attacker if they lose)'
	}
];

export const diceInfo = {
	1: { alt: '⚀', imagePath: '/dice/face-1.svg' },
	2: { alt: '⚁', imagePath: '/dice/face-2.svg' },
	3: { alt: '⚂', imagePath: '/dice/face-3.svg' },
	4: { alt: '⚃', imagePath: '/dice/face-4.svg' },
	5: { alt: '⚄', imagePath: '/dice/face-5.svg' },
	6: { alt: '⚅', imagePath: '/dice/face-6.svg' }
};

export const ships: { [key: number]: Ship } = {
	1: { value: 1, name: 'Battlestation', description: '' },
	2: { value: 2, name: 'Flagship', description: '' },
	3: { value: 3, name: 'Destroyer', description: '' },
	4: { value: 4, name: 'Frigate', description: '' },
	5: { value: 5, name: 'Interceptor', description: '' },
	6: { value: 6, name: 'Scout', description: '' }
};

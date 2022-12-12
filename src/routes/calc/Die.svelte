<script lang="ts">
	const dice = {
		1: [0, 0, 0, 0, 1, 0, 0, 0, 0],
		2: [1, 0, 0, 0, 0, 0, 0, 0, 1],
		3: [1, 0, 0, 0, 1, 0, 0, 0, 1],
		4: [1, 0, 1, 0, 0, 0, 1, 0, 1],
		5: [1, 0, 1, 0, 1, 0, 1, 0, 1],
		6: [1, 0, 1, 1, 0, 1, 1, 0, 1]
	};

	export let number = null;
	export let side = null;
</script>

<div class={`face ${side === 'attacker' ? 'attacker-face' : 'defender-face'}`}>
	{#each dice[number] as showPip}
		<span class={`pip ${showPip && (side === 'attacker' ? 'attacker-pip' : 'defender-pip')}`} />
	{/each}
</div>

<style type="text/css">
	.face {
		display: grid;
		grid-template-columns: auto auto auto;
		justify-content: center;
		padding: 3px;
		border-radius: 5%;
		
	}
	.attacker-face {
		background-color: var(--bs-dark);
		/* box-shadow: inset 0 1px #111, inset 0 -1px rgb(94, 94, 94), inset 1px 0 rgb(143, 143, 143), inset -1px 0 rgb(143, 143, 143); */
	}
	.defender-face {
		background-color: var(--bs-light);
		/* box-shadow: inset 0 1px white, inset 0 -1px #bbb, inset 1px 0 #d7d7d7, inset -1px 0 #d7d7d7; */
	}

	.pip {
		justify-self: center;
		align-self: center;
		border-radius: 50%;
		display: block;
		height: 15px;
		width: 15px;
		margin: 1px;
	}
	
	.defender-pip {
		/* box-shadow: inset 0 1px #111, inset 0 -1px #555; */
		background-color: var(--bs-dark);
	}
	.attacker-pip {
		/* box-shadow: inset 0 1px #111, inset 0 -1px #555; */
		background-color: var(--bs-light);
	}
</style>

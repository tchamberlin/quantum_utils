<script lang="ts">
	import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink
	} from 'sveltestrap/src';
	// import githubLogo from './icons/GitHub-Mark-32px.png';

	import { page } from '$app/stores';

	let isOpen = false;

	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}
</script>

<header>
	<Navbar color="light" light expand="md">
		<NavbarBrand href="/">Quantum Tools</NavbarBrand>
		<NavbarToggler on:click={() => (isOpen = !isOpen)} />
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
			<Nav navbar>
				<NavItem>
					<NavLink href="./" active={$page.url.pathname === '/'}>Home</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="./calc" active={$page.url.pathname === '/calc'}>Calc</NavLink>
				</NavItem>
			</Nav>
		</Collapse>
	</Navbar>
</header>

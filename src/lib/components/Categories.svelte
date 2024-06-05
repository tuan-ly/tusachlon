<script>
	export let categories = ['Featured', 'Books', 'Collectible Books', 'Entertainment', 'Gifts'];
</script>

<nav class="bg-white py-4 shadow-md">
	<div class="container mx-auto flex items-center justify-between">
		{#each categories as category}
			<a href="#" class="nav-item">{category}</a>
		{/each}
	</div>
</nav>

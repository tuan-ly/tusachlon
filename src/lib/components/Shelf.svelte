<script>
	import { onMount } from 'svelte';
	import BookCard from './Book_card.svelte';

	export let books = [];
</script>

<main>
	<div class="container mx-auto my-4 flex flex-wrap justify-center gap-4">
		{#if books.length}
			{#each books as book}
				<BookCard {book} />
			{/each}
		{:else}
			<p>No books available.</p>
		{/if}
	</div>
</main>

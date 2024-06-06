<script>
	import { onMount } from 'svelte';
	import BookCard from './Book_card.svelte';

	let books = [];

	onMount(async () => {
		try {
			const response = await fetch('/api/notion/books');
			books = await response.json();
			console.log(books);
		} catch (error) {
			console.error('Error fetching books:', error);
		}
	});
</script>

<div class="container mx-auto my-4 flex flex-wrap justify-center gap-4">
	{#each books as book}
		<BookCard {book} />
	{/each}
</div>

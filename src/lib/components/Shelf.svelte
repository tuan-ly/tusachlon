<script>
	import { onMount } from 'svelte';
	import BookCard from './Book_card.svelte';

	let books = [];
	const propToConvert = ['authors', 'genres', 'categories', 'translators'];

	// Fetch related data from the specified API routes
	async function fetchRelatedData() {
		const endpoints = {
			authors: '/api/notion/authors',
			genres: '/api/notion/genres',
			categories: '/api/notion/categories',
			translators: '/api/notion/translators'
		};

		const promises = propToConvert.map((prop) => fetch(endpoints[prop]).then((res) => res.json()));
		const results = await Promise.all(promises);

		const relatedData = {};
		propToConvert.forEach((prop, index) => {
			relatedData[prop] = results[index];
		});

		return relatedData;
	}

	// Convert IDs to names for the specified properties
	function convertIdsToNames(item, relatedData) {
		const convertedItem = { ...item };

		for (const prop of propToConvert) {
			if (Array.isArray(convertedItem[prop])) {
				convertedItem[prop] = convertedItem[prop].map((id) => {
					const entry = relatedData[prop].find((e) => e.id === id);
					return entry ? entry.name : id;
				});
			}
		}

		return convertedItem;
	}

	// Fetch books and related data, then convert IDs to names
	onMount(async () => {
		try {
			const [booksResponse, relatedData] = await Promise.all([
				fetch('/api/notion/books').then((res) => res.json()),
				fetchRelatedData()
			]);

			books = booksResponse.map((book) => convertIdsToNames(book, relatedData));
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

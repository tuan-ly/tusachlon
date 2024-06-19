<script>
	import Home2 from '$lib/components/Home2.svelte';
	import Home1 from '$lib/components/Home1.svelte';
	import Page1 from '$lib/components/page1.svelte';
	import BookCard from '$lib/components/Book_card.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Shelf from '$lib/components/Shelf.svelte';
	import Book from '$lib/components/Book.svelte';

	export let data;
	// console.log(data);
</script>

<!-- <Page1/>
<Home2/>
<Home1/> -->
<main class="bg-gray-100">
	<Shelf books={data.books} />
	<!-- <BookCard /> -->
</main>

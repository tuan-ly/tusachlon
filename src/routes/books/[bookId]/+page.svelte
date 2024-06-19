<script>
	import Book from '$lib/components/Book.svelte';
	import Book_2 from '$lib/components/Book_2.svelte';
	export let data;
</script>

<!-- <Book book={data.book} /> -->
<Book_2 book={data.book} />

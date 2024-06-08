<script>
	import Book from '$lib/components/Book.svelte';
	export let data;
</script>

<Book book={data.book} />

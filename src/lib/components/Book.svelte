<script>
	import BookLeft from './Book_Left.svelte';
	import Stars from './Stars.svelte';
	import TruncatedContent from './TruncatedContent.svelte';

	export let book = {};
</script>

<div class="container py-8">
	<div class="flex flex-row bg-white">
		<BookLeft {book} />
		<div class="relative flex-1 p-8">
			<div class="flex items-start justify-between">
				<div>
					<div class="text-sm font-semibold uppercase tracking-wide text-indigo-500">
						{book.name}
					</div>
					<h1 class="mt-1 block text-lg font-medium leading-tight text-black">{book.authors}</h1>
					<div class="mt-2 flex items-center">
						<Stars stars={3.91} />
						<span class="ml-2 text-sm text-gray-600">3.91</span>
						<span class="ml-2 text-sm text-gray-600">(40,223 ratings)</span>
					</div>
				</div>
			</div>
			<TruncatedContent>
				<p class="text-smtext-gray-500">
					{book.description.parent}
				</p>
			</TruncatedContent>
		</div>
	</div>
</div>

<script>
	import BookLeft from './Book_Left.svelte';
	import Stars from './Stars.svelte';
	import TruncatedContent from './TruncatedContent.svelte';

	export let book = {};
</script>

<section class="bg-gray-100">
	<div class="container mx-auto p-4">
		<div class="rounded-lg bg-white p-6 shadow-md md:flex">
			<div class="max-w-3xl md:w-2/3 md:pr-6">
				<h2 class="mb-4 text-2xl font-bold">{book.name}</h2>
				<h3 class="mb-2 text-xl font-semibold">{book.authors}</h3>
				<div>
					<h4 class="mb-2 text-lg font-semibold">Rating</h4>
					<Stars stars={3.91} />
				</div>
				<div class="mb-4">
					<h4 class="mb-2 text-lg font-semibold">Description</h4>
					<TruncatedContent>
						<div class="max-w-2xl text-base text-gray-700">
							<div class="styleHtml">
								{@html book.description}
								<p></p>
							</div>
						</div>
					</TruncatedContent>
				</div>
			</div>
			<div class="mt-6 flex flex-col md:mt-0 md:w-1/3">
				<div class="sticky top-4 flex flex-col">
					<img src={book.images[0]} alt="Book Cover" class="rounded-lg" />
					<a
						href={book.url}
						target="_blank"
						class="mx-auto mt-4 inline-block w-[50%] rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
					>
						Read Book
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

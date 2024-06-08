<script>
	import * as Card from '$lib/components/ui/card';
	export let book;
	let { authors, name, images, id } = book;
</script>

<a
	href={`/books/${id}`}
	class="group relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
>
	<Card.Root class="w-full max-w-sm">
		<div class="rounded-lg">
			<img src={images[0]} alt="Book cover" class="w-full rounded rounded-t-lg object-cover" />
		</div>

		<Card.Header class="grid gap-1 p-4">
			<Card.Title>{name}</Card.Title>
			<Card.Description>{authors}</Card.Description>
		</Card.Header>
	</Card.Root>
</a>

<script>
	import * as Card from '$lib/components/ui/card';

	export let title = '10,000 hours';
	export let coverImg =
		'https://salt.tikicdn.com/cache/750x750/ts/product/25/5a/d4/fc46af47ce7a83545a7f5c1344d260b7.jpg.webp';
	export let author = 'Heminton';
</script>

<div
	class="group relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
>
	<Card.Root class="w-full max-w-sm">
		<div class="rounded-lg">
			<img src={coverImg} alt="Book cover" class="w-full rounded rounded-t-lg object-cover" />
		</div>

		<Card.Header class="grid gap-1 p-4">
			<Card.Title>{title}</Card.Title>
			<Card.Description>{author}</Card.Description>
		</Card.Header>
	</Card.Root>
</div>

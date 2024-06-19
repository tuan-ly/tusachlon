<script>
	export let stars = 0;
	// round stars to nearest integer
	stars = Math.round(stars);
</script>

<div class="flex items-center">
	<!-- loop stars times to render stars with yellow color using star.svg in static -->
	{#each { length: stars } as _}
		<svg class="h-4 w-4 fill-current text-yellow-500" viewBox="0 0 24 24">
			<path
				d="M12 .587l3.668 7.429 8.21 1.192-5.934 5.784 1.4 8.155-7.344-3.86-7.344 3.86 1.4-8.155-5.934-5.784 8.21-1.192z"
			/>
		</svg>
	{/each}

	<!-- loop (5 - stars) times to render stars with gray color using star.svg in static -->
	{#each { length: 5 - stars } as _}
		<svg class="h-4 w-4 fill-current text-gray-300" viewBox="0 0 24 24">
			<path
				d="M12 .587l3.668 7.429 8.21 1.192-5.934 5.784 1.4 8.155-7.344-3.86-7.344 3.86 1.4-8.155-5.934-5.784 8.21-1.192z"
			/>
		</svg>
	{/each}
</div>

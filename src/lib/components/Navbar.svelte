<script>
	import Categories from './Categories.svelte';
</script>

<nav class="bg-gray-800 py-4 text-white md:py-6 lg:py-8">
	<div class="container mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8">
		<div class="flex items-center space-x-6">
			<a class="font-medium hover:text-gray-300" href="/"> Home </a>
			<a class="font-medium hover:text-gray-300" href="#"> Genres </a>
			<a class="font-medium hover:text-gray-300" href="#"> Reviews </a>
		</div>
		<div class="flex items-center space-x-4">
			<div class="relative">
				<input
					class="flex h-10 w-64 rounded-md border border-none border-input bg-gray-700 px-4 py-2 text-sm text-white placeholder-gray-400 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:ring-2 focus:ring-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Search books..."
					type="text"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
				>
					<circle cx="11" cy="11" r="8"></circle>
					<path d="m21 21-4.3-4.3"></path>
				</svg>
			</div>
			<a class="hover:text-gray-300" href="#">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-6 w-6"
				>
					<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
					<circle cx="12" cy="7" r="4"></circle>
				</svg>
			</a>
		</div>
	</div>
</nav>

<!-- <Categories /> -->

<script>
	export let book = {};
	let { images } = book;
</script>

<div class="md:flex">
	<div class=" flex-col justify-start md:flex">
		<img class="h-48 w-full object-cover md:w-48" src={images} alt="Book cover" />
		<button class="mx-auto rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700">
			Want to read
		</button>
	</div>
</div>

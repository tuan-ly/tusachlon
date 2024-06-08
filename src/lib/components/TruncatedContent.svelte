<script>
	import { onMount } from 'svelte';

	let contentEl;
	let isTooLong = false;
	let isTruncated = true;

	const maxHeight = 100; // Max height in pixels before truncation

	onMount(() => {
		isTooLong = contentEl.scrollHeight > maxHeight;
	});

	function toggleContent() {
		isTruncated = !isTruncated;
	}
</script>

<div bind:this={contentEl} class="content" class:expanded={!isTruncated}>
	<slot />
</div>

{#if isTooLong}
	<div class="show" class:show-more={isTruncated} class:show-less={!isTruncated}>
		<button class="hover:underline" on:click={toggleContent}>
			{isTruncated ? 'Show More' : 'Show Less'}
		</button>
	</div>
{/if}

<style>
	.content {
		max-height: 100px; /* Match the maxHeight in the script */
		overflow: hidden;
		transition: max-height 0.3s ease;
	}
	.expanded {
		max-height: none;
	}
	.show {
		z-index: 100;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 5rem; /* Adjust height as needed */
		display: flex;
		justify-content: center;
		align-items: end;
		cursor: pointer;
	}
	.show-more {
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
	}
	.show-less {
		/* Remove the default button styles */
		background: none;
		/* display: none; Hide the button if not truncated */
	}
</style>

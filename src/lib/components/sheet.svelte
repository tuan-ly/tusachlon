<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import Books from './Books.svelte';
</script>

<Sheet.Root>
	<Sheet.Trigger>Open</Sheet.Trigger>
	<Sheet.Content><Books /></Sheet.Content>
</Sheet.Root>

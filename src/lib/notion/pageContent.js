import { notion } from './notionClient';

export async function getContentBlocks(pageId) {
	const { results } = await notion.blocks.children.list({
		block_id: pageId
	});

	return results;
}

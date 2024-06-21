import { notion } from './notionClient';
import { NotionRenderer } from '@notion-render/client';

const renderer = new NotionRenderer();

export async function getPageHtml(pageId) {
	const { results } = await notion.blocks.children.list({
		block_id: pageId
	});
	const html = await renderer.render(...results);
	// console.log(html);
	return html;
}

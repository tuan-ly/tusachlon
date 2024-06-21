import { NotionToMarkdown } from 'notion-to-md';
import { notion } from '$lib/notion/notionClient';
import { getContentBlocks } from '../notion';
const n2m = new NotionToMarkdown({ notionClient: notion });

//note that all the function pass through schema have to take argument pageId
// async function getContent(pageId) {
// return await getPageHtml(pageId);
// const pageMd = await n2m.pageToMarkdown(pageId);
// console.log(h);
// return n2m.toMarkdownString(pageMd);
// }
export const schema = {
	books: {
		name: 'Name',
		authors: 'Authors [DB]',
		categories: 'Categories [DB]',
		genres: 'Genres [DB]',
		translators: 'Translators [DB]',
		description: 'Main Review ID',
		images: 'Images',
		url: 'Product URL'
	},
	reviews: {
		name: 'Name',
		pageContentBlocks: getContentBlocks
	},
	authors: {
		name: 'Name'
	},
	categories: {
		name: 'Name'
	},
	genres: {
		name: 'Name'
	},
	translators: {
		name: 'Name'
	}
	// Add other mappings as needed
};
export const pageSchema = {
	books: {
		name: 'Name',
		authors: 'Authors [DB]',
		categories: 'Categories [DB]',
		genres: 'Genres [DB]',
		translators: 'Translators [DB]',
		description: 'Main Review ID',
		images: 'Images',
		url: 'Product URL'
	},
	reviews: {
		name: 'Name',
		pageContentBlocks: getContentBlocks
	},
	authors: {
		name: 'Name'
	},
	categories: {
		name: 'Name'
	},
	genres: {
		name: 'Name'
	},
	translators: {
		name: 'Name'
	}
	// Add other mappings as needed
};

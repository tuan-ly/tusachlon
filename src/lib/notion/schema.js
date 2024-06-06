import { NotionToMarkdown } from 'notion-to-md';
import { notion } from '$lib/notion/notionClient';

const n2m = new NotionToMarkdown({ notionClient: notion });

async function getContent(id) {
	const pageMd = await n2m.pageToMarkdown(id);
	return n2m.toMarkdownString(pageMd).parent;
}

export const schema = {
	books: {
		name: 'Name',
		authors: 'Authors [DB]',
		categories: 'Categories [DB]',
		genres: 'Genres [DB]',
		translators: 'Translators [DB]',
		reviews: 'Reviews [DB]',
		images: 'Images'
	},
	reviews: {
		name: 'Name',
		childContent: getContent
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

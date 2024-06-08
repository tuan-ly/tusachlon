import { NotionToMarkdown } from 'notion-to-md';
import { notion } from '$lib/notion/notionClient';

const n2m = new NotionToMarkdown({ notionClient: notion });

//note that all the function pass through schema have to take argument pageId
async function getContent(pageId) {
	const pageMd = await n2m.pageToMarkdown(pageId);
	return n2m.toMarkdownString(pageMd);
}

export const schema = {
	books: {
		name: 'Name',
		authors: 'Authors [DB]',
		categories: 'Categories [DB]',
		genres: 'Genres [DB]',
		translators: 'Translators [DB]',
		description: 'Main Review ID',
		images: 'Images'
	},
	reviews: {
		name: 'Name' //,		childContent: getContent
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

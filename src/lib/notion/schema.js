import { getPageHtml } from '../notion';

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
		contentHtml: getPageHtml
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
		contentHtml: getPageHtml
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

const schemas = {
	books: {
		id: 'id',
		title: 'properties.Name.title[0]?.text.content',
		authors: 'properties.["Authors [DB]"].relation.map(rel => rel.id)',
		translators: 'properties.["Translators [DB]"].relation.map(rel => rel.id)',
		genres: 'properties.["Genres [DB]"].relation.map(rel => rel.id)',
		categories: 'properties.["Categories [DB]"].relation.map(rel => rel.id)',
		reviews: 'properties.["Reviews [DB]"].relation.map(rel => rel.id)'
	},
	reviews: {
		id: 'id',
		reviewText: 'properties.ReviewText.rich_text[0]?.text.content',
		bookId: 'properties.Book.relation[0]?.id'
	},
	authors: {
		id: 'id',
		name: 'properties.Name.title[0]?.text.content'
	},
	translators: {
		id: 'id',
		name: 'properties.Name.title[0]?.text.content'
	},
	genres: {
		id: 'id',
		name: 'properties.Name.title[0]?.text.content'
	}
};

export default schemas;

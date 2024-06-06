import { Client } from '@notionhq/client';

import schemas from '$lib/notion/schemas.js';
import { fetchAllPages, saveProcessedData, processData } from '$lib/notion/utils.js';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function fetchData() {
	const authors = processData(
		await fetchAllPages(notion, 'your_authors_database_id'),
		schemas.authors
	);
	const translators = processData(
		await fetchAllPages(notion, 'your_translators_database_id'),
		schemas.translators
	);
	const genres = processData(
		await fetchAllPages(notion, 'your_genres_database_id'),
		schemas.genres
	);
	const categories = processData(
		await fetchAllPages(notion, 'your_categories_database_id'),
		schemas.genres
	); // assuming processGenreData works for categories as well
	const reviews = processData(
		await fetchAllPages(notion, 'your_reviews_database_id'),
		schemas.reviews
	);

	const booksRaw = await fetchAllPages(notion, 'your_books_database_id');
	const books = processData(booksRaw, schemas.books).map((book) => ({
		...book,
		author: book.author.map((id) => authors.find((author) => author.id === id)),
		translators: book.translators.map((id) =>
			translators.find((translators) => translators.id === id)
		),
		genre: book.genre.map((id) => genres.find((genre) => genre.id === id)),
		category: book.category.map((id) => categories.find((category) => category.id === id)),
		reviews: book.reviews.map((id) => reviews.find((review) => review.id === id))
	}));

	saveProcessedData('books.json', books);
	saveProcessedData('authors.json', authors);
	saveProcessedData('genres.json', genres);
	saveProcessedData('categories.json', categories);
	saveProcessedData('reviews.json', reviews);
}

export async function get() {
	try {
		await fetchData();
		return {
			status: 200,
			body: 'Notion data updated'
		};
	} catch (error) {
		return {
			status: 500,
			body: 'Error updating data'
		};
	}
}

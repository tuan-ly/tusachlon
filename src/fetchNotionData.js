import { Client } from '@notionhq/client';
import fs from 'fs';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function fetchAllPages(databaseId) {
	let results = [];
	let hasMore = true;
	let startCursor = undefined;

	while (hasMore) {
		const response = await notion.databases.query({
			database_id: databaseId,
			start_cursor: startCursor
		});
		results = results.concat(response.results);
		hasMore = response.has_more;
		startCursor = response.next_cursor;
	}

	return results;
}

async function saveNotionData(databaseId, filename) {
	const data = await fetchAllPages(databaseId);
	fs.writeFileSync(`static/${filename}`, JSON.stringify(data, null, 2));
	console.log(`Data saved to static/${filename}`);
}

async function fetchData() {
	await saveNotionData('your_books_database_id', 'books.json');
	await saveNotionData('your_reviews_database_id', 'reviews.json');
	await saveNotionData('your_authors_database_id', 'authors.json');
	await saveNotionData('your_genres_database_id', 'genres.json');
}

fetchData().catch((error) => {
	console.error(error);
});

// src/routes/api/notion/[dbName]/+server.js
import { notion } from '$lib/notionClient';
import { retryWithBackoff } from '$lib/utils/retryWithBackoff';
import { notionDbMapping } from '$lib/notionDbMapping';

// In-memory cache (for demonstration purposes)
let cache = {};

async function fetchNotionData(databaseId, cursor) {
	const response = await retryWithBackoff(async () => {
		return await notion.databases.query({
			database_id: databaseId,
			start_cursor: cursor,
			page_size: 100
		});
	});

	return response;
}

async function getNotionData(databaseId) {
	if (cache[databaseId] && cache[databaseId].expiry > Date.now()) {
		return cache[databaseId].data;
	}

	let results = [];
	let cursor = undefined;

	do {
		const response = await fetchNotionData(databaseId, cursor);
		results = results.concat(response.results);
		cursor = response.next_cursor;
	} while (cursor);

	// Cache the results for 1 hour
	cache[databaseId] = {
		data: results,
		expiry: Date.now() + 3600 * 1000
	};

	return results;
}

export async function GET({ params }) {
	const { dbName } = params;
	const databaseId = notionDbMapping[dbName];

	if (!databaseId) {
		return new Response(JSON.stringify({ error: 'Database ID not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const data = await getNotionData(databaseId);
		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

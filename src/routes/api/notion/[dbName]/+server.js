import { notion } from '$lib/notion/notionClient';
import { retryWithBackoff } from '$lib/notion/retryWithBackoff';
import { notionDbMapping } from '$lib/notion/notionDbMapping';
import { convertPropertiesDynamically } from '$lib/notion/convertProperties.js';
import { schema } from '$lib/notion/schema.js';
import { NotionToMarkdown } from 'notion-to-md';

// Initialize NotionToMarkdown instance
const n2m = new NotionToMarkdown({ notionClient: notion });

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

async function getContent(id) {
	const contentBlocks = await notion.blocks.children.list({ block_id: id });
	const mdBlocks = await n2m.blocksToMarkdown(contentBlocks.results);
	return n2m.toMarkdownString(mdBlocks);
}

async function getNotionData(databaseId, schema) {
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

	// Convert properties dynamically
	if (schema) {
		results = await Promise.all(
			results.map(async (page) => {
				const convertedPage = convertPropertiesDynamically(page, schema);
				if (schema.childContent) {
					convertedPage.content = await schema.childContent(page.id);
				}
				return convertedPage;
			})
		);
	}

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
		const data = await getNotionData(databaseId, schema[dbName]);

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

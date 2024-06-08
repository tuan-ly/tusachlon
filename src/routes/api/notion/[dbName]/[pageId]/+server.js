// src/routes/api/notion/[dbName]/[id]/+server.js

import { convertPropertiesDynamically } from '$lib/notion/convertProperties.js';
import { notion } from '$lib/notion/notionClient';
import { retryWithBackoff } from '$lib/notion/retryWithBackoff';
import { pageSchema } from '$lib/notion/schema';

async function fetchNotionPage(entryId) {
	const response = await retryWithBackoff(async () => {
		return await notion.pages.retrieve({
			page_id: entryId
		});
	});

	return response;
}

export async function GET({ params }) {
	const { dbName, pageId } = params;

	if (!pageSchema[dbName]) {
		return new Response(JSON.stringify({ error: 'Invalid database name' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const pageData = await fetchNotionPage(pageId);
		const schema = pageSchema[dbName];
		const processedData = await convertPropertiesDynamically(pageData, schema);

		return new Response(JSON.stringify(processedData), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		let errorMessage = 'An error occurred while fetching the page.';
		let statusCode = 500;

		if (error.code === 'object_not_found') {
			errorMessage = 'Page not found.';
			statusCode = 404;
		} else if (error.code === 'unauthorized' || error.code === 'restricted_resource') {
			errorMessage = 'Unauthorized access.';
			statusCode = 401;
		} else if (error.code === 'rate_limited') {
			errorMessage = 'Rate limit exceeded. Please try again later.';
			statusCode = 429;
		}

		return new Response(JSON.stringify({ error: errorMessage }), {
			status: statusCode,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

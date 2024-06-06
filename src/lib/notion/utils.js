// import schemas from './schemas.js';

export async function fetchAllPages(notion, databaseId) {
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
export async function fetchPageContent(pageId) {
	const response = await notion.blocks.children.list({
		block_id: pageId
	});
	return response.results.map((block) => block.paragraph?.text[0]?.plain_text).join(' ');
}

export function saveProcessedData(filename, data) {
	fs.writeFileSync(`/tmp/${filename}`, JSON.stringify(data, null, 2));
	console.log(`Data saved to /tmp/${filename}`);
}

export function processData(rawData, schemas) {
	return rawData.map((item) => {
		const processedItem = {};
		for (const key in schemas) {
			processedItem[key] = eval(`item.${schemas[key]}`);
		}
		return processedItem;
	});
}

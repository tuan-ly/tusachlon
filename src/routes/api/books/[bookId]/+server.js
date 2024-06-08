const propToConvert = {
	authors: 'name',
	genres: 'name',
	categories: 'name',
	translators: 'name',
	description: 'childContent'
};

const endpoints = {
	authors: '/api/notion/authors',
	genres: '/api/notion/genres',
	categories: '/api/notion/categories',
	translators: '/api/notion/translators',
	description: '/api/notion/reviews'
};

// Fetch related data for specific IDs
async function fetchRelatedData(fetch, ids, endpoint) {
	if (!Array.isArray(ids) || ids.length === 0) return [];
	const promises = ids.map((id) => fetch(`${endpoint}/${id}`).then((res) => res.json()));
	return await Promise.all(promises);
}

// Convert IDs to names or content for the specified properties
function convertIdsToNames(item, relatedData, prop) {
	const convertedItem = { ...item };
	if (Array.isArray(convertedItem[prop])) {
		convertedItem[prop] = convertedItem[prop].map((id) => {
			const entry = relatedData.find((e) => e.id === id);
			return entry ? entry[propToConvert[prop]] : id;
		});
	} else {
		const entry = relatedData.find(
			(e) => e.id.replaceAll('-', '') === convertedItem[prop].replaceAll('-', '')
		);
		convertedItem[prop] = entry ? entry[propToConvert[prop]] : convertedItem[prop];
	}
	return convertedItem;
}

// Fetch books and related data, then convert IDs to names or content
export async function GET({ fetch, params }) {
	try {
		const bookResponse = await fetch(`/api/notion/books/${params.bookId}`).then((res) =>
			res.json()
		);
		let book = bookResponse;

		const relatedDataPromises = Object.keys(propToConvert).map(async (prop) => {
			const ids = Array.isArray(book[prop]) ? book[prop] : [book[prop]];
			const relatedData = await fetchRelatedData(fetch, ids, endpoints[prop]);
			book = convertIdsToNames(book, relatedData, prop);
		});

		await Promise.all(relatedDataPromises);

		return new Response(JSON.stringify(book), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

const propToConvert = {
	authors: 'name',
	genres: 'name',
	categories: 'name',
	translators: 'name',
	description: 'name'
};

const endpoints = {
	authors: '/api/notion/authors',
	genres: '/api/notion/genres',
	categories: '/api/notion/categories',
	translators: '/api/notion/translators',
	description: '/api/notion/reviews'
};

// Fetch related data from the specified API routes
async function fetchRelatedData(fetch) {
	const promises = Object.keys(propToConvert).map((prop) =>
		fetch(endpoints[prop]).then((res) => res.json())
	);
	const results = await Promise.all(promises);

	const relatedData = {};
	Object.keys(propToConvert).forEach((prop, index) => {
		relatedData[prop] = results[index];
	});

	return relatedData;
}

// Convert IDs to names or content for the specified properties
function convertIdsToNames(item, relatedData) {
	const convertedItem = { ...item };

	for (const prop in propToConvert) {
		if (Array.isArray(convertedItem[prop])) {
			convertedItem[prop] = convertedItem[prop].map((id) => {
				const entry = relatedData[prop].find((e) => e.id === id);
				return entry ? entry[propToConvert[prop]] : id;
			});
		} else {
			//if not array then it is an id string without the "-" in it (not uuid)
			const entry = relatedData[prop].find(
				(e) => e.id.replaceAll('-', '') === convertedItem[prop].replaceAll('-', '')
			);
			convertedItem[prop] = entry ? entry[propToConvert[prop]] : convertedItem[prop];
		}
	}

	return convertedItem;
}

// Fetch books and related data, then convert IDs to names or content
export async function GET({ fetch }) {
	try {
		const [booksResponse, relatedData] = await Promise.all([
			fetch('/api/notion/books').then((res) => res.json()),
			fetchRelatedData(fetch)
		]);

		const books = booksResponse.map((book) => convertIdsToNames(book, relatedData));

		return new Response(JSON.stringify(books), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

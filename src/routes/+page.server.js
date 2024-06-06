export const prerender = true;
const propToConvert = ['authors', 'genres', 'categories', 'translators'];

const endpoints = {
	authors: '/api/notion/authors',
	genres: '/api/notion/genres',
	categories: '/api/notion/categories',
	translators: '/api/notion/translators'
};

// Fetch related data from the specified API routes
async function fetchRelatedData(fetch) {
	const promises = propToConvert.map((prop) => fetch(endpoints[prop]).then((res) => res.json()));
	const results = await Promise.all(promises);

	const relatedData = {};
	propToConvert.forEach((prop, index) => {
		relatedData[prop] = results[index];
	});

	return relatedData;
}

// Convert IDs to names for the specified properties
function convertIdsToNames(item, relatedData) {
	const convertedItem = { ...item };

	for (const prop of propToConvert) {
		if (Array.isArray(convertedItem[prop])) {
			convertedItem[prop] = convertedItem[prop].map((id) => {
				const entry = relatedData[prop].find((e) => e.id === id);
				return entry ? entry.name : id;
			});
		}
	}

	return convertedItem;
}

// Fetch books and related data, then convert IDs to names
export async function load({ fetch }) {
	try {
		const [booksResponse, relatedData] = await Promise.all([
			fetch('/api/notion/books').then((res) => res.json()),
			fetchRelatedData(fetch)
		]);

		const books = booksResponse.map((book) => convertIdsToNames(book, relatedData));
		return {
			books
		};
	} catch (error) {
		console.error('Error fetching books:', error);
		return {
			books: []
		};
	}
}

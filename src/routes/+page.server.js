export const prerender = true;

export async function load({ fetch }) {
	try {
		const books = await fetch('/api/books').then((res) => res.json());
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

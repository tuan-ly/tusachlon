//fetch data from api/books/[bookId]
export async function load({ fetch, params }) {
	const res = await fetch(`/api/books/${params.bookId}`);
	const data = await res.json();
	return {
		book: data
	};
}

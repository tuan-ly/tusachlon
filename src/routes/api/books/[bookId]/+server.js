//fetch api/books
//find id = bookId

export async function GET({ fetch, params }) {
	try {
		const response = await fetch(`/api/books`);
		const data = await response.json();
		//find id = bookId
		const book = data.find((book) => book.id === params.bookId);

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

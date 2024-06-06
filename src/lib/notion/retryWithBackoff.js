const MAX_RETRIES = 5;

export async function retryWithBackoff(fn, retries = MAX_RETRIES, delay = 300) {
	try {
		return await fn();
	} catch (error) {
		if (retries > 0 && error.status === 429) {
			await new Promise((resolve) => setTimeout(resolve, delay));
			return retryWithBackoff(fn, retries - 1, delay * 2); // Exponential backoff
		}
		throw error;
	}
}

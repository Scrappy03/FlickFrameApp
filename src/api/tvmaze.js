const BASE_URL = 'https://api.tvmaze.com';

export async function getShowsPage(page = 0, { signal } = {}) {
    const response = await fetch(`${BASE_URL}/shows?page=${page}`, { signal });

    if (!response.ok) {
        throw new Error(`TVMaze request failed (${response.status})`);
    }

    return response.json();
}

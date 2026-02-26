const BASE_URL = 'https://api.tvmaze.com';

export async function getShowsPage(page = 0) {
    const response = await fetch(`${BASE_URL}/shows?page=${page}`);

    if (!response.ok) {
        throw new Error(`TVMaze request failed (${response.status})`);
    }

    return response.json();
}

export async function getPeoplePage(page = 0) {
    const response = await fetch(`${BASE_URL}/people?page=${page}`);

    if (!response.ok) {
        throw new Error(`TVMaze request failed (${response.status})`);
    }

    return response.json();
}

export async function getShow(id) {
    const response = await fetch(`${BASE_URL}/shows/${id}`);

    if (!response.ok) {
        throw new Error(`TVMaze request failed (${response.status})`);
    }

    return response.json();
}

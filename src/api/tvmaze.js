const baseUrl = 'https://api.tvmaze.com';

export async function getShowsPage(page = 0) {
    const response = await fetch(`${baseUrl}/shows?page=${page}`);

    if (!response.ok) {
        throw new Error(`TVMaze request failed (${response.status})`);
    }

    return response.json();
}

export async function getPeoplePage(page = 0) {
    const response = await fetch(`${baseUrl}/people?page=${page}`);

    if (!response.ok) {
        throw new Error(`TVMaze request failed (${response.status})`);
    }

    return response.json();
}

export async function getShow(id) {
    const response = await fetch(`${baseUrl}/shows/${id}`);

    if (!response.ok) {
        throw new Error(`TVMaze request failed (${response.status})`);
    }

    return response.json();
}

export async function searchShows(query, signal) {
    const url = `${baseUrl}/search/shows?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal,
    });

    if (!response.ok) {
        throw new Error(`TVMaze request failed (${response.status})`);
    }

    const results = await response.json();
    return results.map((r) => r.show);
}

export async function searchPeople(query, signal) {
    const url = `${baseUrl}/search/people?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal,
    });

    if (!response.ok) {
        throw new Error(`TVMaze request failed (${response.status})`);
    }

    const results = await response.json();
    return results.map((r) => r.person);
}

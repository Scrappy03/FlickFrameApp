const baseUrl = 'https://api.tvmaze.com';

async function tvFetch(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`TVMaze request failed (${response.status})`);
    return response.json();
}

export function getShowsPage(page = 0) {
    return tvFetch(`${baseUrl}/shows?page=${page}`);
}

export function getPeoplePage(page = 0) {
    return tvFetch(`${baseUrl}/people?page=${page}`);
}

export function getShow(id) {
    return tvFetch(`${baseUrl}/shows/${id}`);
}

export async function searchShows(query, signal) {
    const results = await tvFetch(
        `${baseUrl}/search/shows?q=${encodeURIComponent(query)}`,
        { signal }
    );
    return results.map((r) => r.show);
}

export async function searchPeople(query, signal) {
    const results = await tvFetch(
        `${baseUrl}/search/people?q=${encodeURIComponent(query)}`,
        { signal }
    );
    return results.map((r) => r.person);
}

export async function getSchedule() {
    const allowedTypes = ['Scripted', 'Animation', 'Documentary'];

    const [broadcastEntries, streamingEntries] = await Promise.all([
        tvFetch(`${baseUrl}/schedule?country=US`),
        tvFetch(`${baseUrl}/schedule/web?country=US`),
    ]);

    const allShows = [
        ...broadcastEntries.map((e) => e.show),
        ...streamingEntries.map((e) => e._embedded?.show ?? e.show),
    ];

    const seen = new Set();
    const shows = [];
    for (const show of allShows) {
        if (!show || seen.has(show.id)) continue;
        if (!allowedTypes.includes(show.type)) continue;
        seen.add(show.id);
        shows.push(show);
    }

    shows.sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0));
    return shows;
}

export async function getNewReleases() {
    const entries = await tvFetch(`${baseUrl}/schedule/web?country=US`);
    const allowedTypes = ['Scripted', 'Animation', 'Documentary'];

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const seen = new Set();
    const shows = [];
    for (const entry of entries) {
        const show = entry._embedded?.show ?? entry.show;
        if (!show || seen.has(show.id)) continue;
        if (!allowedTypes.includes(show.type)) continue;
        if (!show.premiered || new Date(show.premiered) < sixMonthsAgo) continue;
        seen.add(show.id);
        shows.push(show);
    }

    shows.sort((a, b) => new Date(b.premiered) - new Date(a.premiered));
    return shows;
}

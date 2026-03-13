import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import ShowsList from '../components/ShowsList';
import ToggleRow from '../components/ToggleRow';
import { searchShows, searchPeople } from '../api/tvmaze';

export default function DiscoverScreen({ navigation, activeTab, onTabChange, data, isLoading, error, focusSearch }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    useEffect(() => {
        if (!searchQuery) {
            setSearchResults([]);
            setSearchError(null);
            return;
        }

        let isCurrent = true;

        setSearchLoading(true);
        setSearchError(null);
        setSearchResults([]);

        const searchFn = activeTab === 'celebs' ? searchPeople : searchShows;
        searchFn(searchQuery)
            .then((results) => {
                if (!isCurrent) return;
                setSearchResults(results);
                if (results.length === 0) {
                    setSearchError(`No results found for "${searchQuery}".`);
                }
            })
            .catch((err) => {
                if (!isCurrent) return;
                console.error('[FlickFrame] Search error:', err.message);
                setSearchError('Search failed. Please try again.');
            })
            .finally(() => setSearchLoading(false));

        return () => {
            isCurrent = false;
        };
    }, [searchQuery, activeTab]);

    const handleSelectShow = (show) => {
        navigation.navigate('ShowDetail', { show });
    };

    const displayData = searchQuery ? searchResults : data;
    const displayLoading = searchQuery ? searchLoading : isLoading;
    const displayError = searchQuery ? searchError : error;

    return (
        <>
            <SearchForm
                onSearch={setSearchQuery}
                activeQuery={searchQuery}
                type={activeTab === 'celebs' ? 'celebs' : 'TV shows'}
                shouldFocus={focusSearch}
            />
            <ToggleRow activeTab={activeTab} onChange={onTabChange} />
            <ShowsList
                data={displayData}
                activeTab={activeTab}
                isLoading={displayLoading}
                error={displayError}
                onSelectShow={handleSelectShow}
            />
        </>
    );
}

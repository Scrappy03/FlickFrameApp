import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getNewReleases, getSchedule, getShow } from '../api/tvmaze';
import FeaturedBanner from '../components/FeaturedBanner';
import TrendingRow from '../components/TrendingRow';

const featuredShowId = 19; // Supernatural

export default function HomeScreen({ navigation, onBrowseShows }) {
    const [featuredShow, setFeaturedShow] = useState(null);
    const [trendingShows, setTrendingShows] = useState([]);
    const [newReleases, setNewReleases] = useState([]);

    useEffect(() => {
        getShow(featuredShowId).then(setFeaturedShow).catch(console.error);
        getSchedule().then(setTrendingShows).catch(console.error);
        getNewReleases().then(setNewReleases).catch(console.error);
    }, []);

    const handleSelectShow = (show) => {
        navigation.navigate('ShowDetail', { show });
    };

    return (
        <ScrollView style={styles.container}>
            {featuredShow && (
                <FeaturedBanner
                    show={featuredShow}
                    onPress={() => handleSelectShow(featuredShow)}
                    onPrimaryAction={() => handleSelectShow(featuredShow)}
                    onSecondaryAction={onBrowseShows}
                    primaryActionLabel="View Details"
                    secondaryActionLabel="Browse Shows"
                />
            )}
            {trendingShows.length > 0 && (
                <TrendingRow heading="Trending Now" shows={trendingShows} onSelectShow={handleSelectShow} />
            )}
            {newReleases.length > 0 && (
                <TrendingRow heading="New Releases" shows={newReleases} onSelectShow={handleSelectShow} />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

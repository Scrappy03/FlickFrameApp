import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getShow } from '../api/tvmaze';
import FeaturedBanner from '../components/FeaturedBanner';

const FEATURED_SHOW_ID = 19; // Supernatural

export default function HomeScreen() {
    const [featuredShow, setFeaturedShow] = useState(null);

    useEffect(() => {
        getShow(FEATURED_SHOW_ID).then(setFeaturedShow).catch(console.error);
    }, []);

    return (
        <ScrollView style={styles.container}>
            {featuredShow && <FeaturedBanner show={featuredShow} />}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

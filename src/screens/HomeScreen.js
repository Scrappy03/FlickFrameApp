import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getShow } from '../api/tvmaze';
import FeaturedBanner from '../components/FeaturedBanner';

const featuredShowId = 19; // Supernatural

export default function HomeScreen() {
    const [featuredShow, setFeaturedShow] = useState(null);

    useEffect(() => {
        getShow(featuredShowId).then(setFeaturedShow).catch(console.error);
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

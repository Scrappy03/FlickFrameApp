import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

function stripHtml(text) {
    if (!text) return null;
    return text.replace(/<[^>]*>/g, '');
}

export default function ShowDetailScreen({ route, navigation }) {
    const { show } = route.params;
    const image = show.image?.original ?? show.image?.medium ?? null;
    const rating = show.rating?.average ?? null;
    const network = show.network?.name ?? null;
    const genres = show.genres?.length ? show.genres.join(' • ') : null;
    const summary = stripHtml(show.summary);

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={20} color="#2563EB" />
                    <Text style={styles.backText}>Back</Text>
                </Pressable>

                {image && (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
                    </View>
                )}

                <View style={styles.content}>
                    <Text style={styles.title}>{show.name}</Text>

                    {genres && <Text style={styles.genres}>{genres}</Text>}

                    <View style={styles.meta}>
                        {rating && (
                            <Text style={styles.metaText}>Rating: {rating} / 10</Text>
                        )}
                        {network && (
                            <Text style={styles.metaText}>Channel: {network}</Text>
                        )}
                    </View>

                    {summary && <Text style={styles.summary}>{summary}</Text>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    container: {
        paddingBottom: 32,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backText: {
        fontSize: 16,
        color: '#2563EB',
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 2 / 3,
        backgroundColor: '#F3F4F6',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#111111',
        marginBottom: 6,
    },
    genres: {
        fontSize: 14,
        color: '#777777',
        marginBottom: 12,
    },
    meta: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    metaText: {
        fontSize: 14,
        color: '#555555',
    },
    summary: {
        fontSize: 15,
        color: '#333333',
        lineHeight: 22,
    },
});

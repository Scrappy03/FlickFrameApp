import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Star } from 'lucide-react-native';
import { getSeasons } from '../api/tvmaze';

function stripHtml(text) {
    if (!text) return null;
    return text
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<[^>]*>/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

export default function ShowDetailScreen({ route, navigation }) {
    const { show } = route.params;
    const image = show.image?.original ?? show.image?.medium ?? null;
    const rating = show.rating?.average ?? null;
    const genres = show.genres ?? [];
    const year = show.premiered ? show.premiered.slice(0, 4) : null;
    const summary = stripHtml(show.summary);

    const [seasonCount, setSeasonCount] = useState(null);

    useEffect(() => {
        getSeasons(show.id)
            .then((seasons) => setSeasonCount(seasons.length))
            .catch(() => { });
    }, [show.id]);

    const seasonLabel = seasonCount !== null
        ? (seasonCount === 1 ? '1 Season' : `${seasonCount} Seasons`)
        : null;

    return (
        <View style={styles.screen}>
            <SafeAreaView edges={['top']} style={styles.topSafeArea}>
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.headerSide}>
                        <ArrowLeft size={22} color="#111111" />
                    </Pressable>

                    <Text style={styles.headerBrand}>
                        <Text style={styles.headerBrandBlue}>Flick</Text>Frame
                    </Text>

                    <View style={styles.headerSide} />
                </View>
            </SafeAreaView>

            <ScrollView contentContainerStyle={styles.container} bounces={false}>
                <View style={styles.heroContainer}>
                    {image && (
                        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                    )}

                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.72)', 'rgba(0,0,0,0.97)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.gradient}
                    >
                        <Text style={styles.title}>{show.name}</Text>

                        {(rating !== null || year || seasonLabel) && (
                            <View style={styles.metaRow}>
                                {rating !== null && (
                                    <View style={styles.ratingItem}>
                                        <Star size={13} color="#FBBF24" fill="#FBBF24" />
                                        <Text style={styles.metaText}>{rating}</Text>
                                    </View>
                                )}
                                {rating !== null && year && <Text style={styles.metaSep}>•</Text>}
                                {year && <Text style={styles.metaText}>{year}</Text>}
                                {(rating !== null || year) && seasonLabel && <Text style={styles.metaSep}>•</Text>}
                                {seasonLabel && <Text style={styles.metaText}>{seasonLabel}</Text>}
                            </View>
                        )}

                        {genres.length > 0 && (
                            <View style={styles.tagsRow}>
                                {genres.map((genre) => (
                                    <View key={genre} style={styles.tag}>
                                        <Text style={styles.tagText}>{genre}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </LinearGradient>
                </View>

                {summary && (
                    <View style={styles.synopsisSection}>
                        <Text style={styles.synopsisHeader}>Synopsis</Text>
                        <Text style={styles.synopsisText}>{summary}</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    topSafeArea: {
        backgroundColor: '#ffffff',
    },
    header: {
        height: 56,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerSide: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerBrand: {
        fontSize: 24,
        fontFamily: 'Oswald_600SemiBold',
        color: '#111111',
    },
    headerBrandBlue: {
        color: '#2563EB',
    },
    container: {
        paddingBottom: 40,
    },
    heroContainer: {
        width: '100%',
        aspectRatio: 2 / 3,
        backgroundColor: '#111111',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '65%',
        justifyContent: 'flex-end',
        padding: 20,
        paddingBottom: 26,
        gap: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ffffff',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    ratingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 14,
        color: '#cccccc',
    },
    metaSep: {
        fontSize: 14,
        color: '#888888',
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    tagText: {
        fontSize: 12,
        color: '#ffffff',
        fontWeight: '600',
    },
    synopsisSection: {
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    synopsisHeader: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111111',
        marginBottom: 10,
    },
    synopsisText: {
        fontSize: 15,
        color: '#333333',
        lineHeight: 23,
    },
});

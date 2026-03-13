import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function TrendingRow({ shows, heading, onSelectShow }) {
    const renderItem = ({ item }) => {
        const imageUri = item.image?.medium;

        return (
            <Pressable style={styles.card} onPress={() => onSelectShow?.(item)}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={[styles.posterBase, styles.poster]} resizeMode="cover" />
                ) : (
                    <View style={[styles.posterBase, styles.posterPlaceholder]}>
                        <Text style={styles.placeholderText}>{(item.name ?? '?').charAt(0)}</Text>
                    </View>
                )}
                <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{heading}</Text>
            <FlatList
                data={shows}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    heading: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111111',
        marginBottom: 12,
        paddingHorizontal: 16,
    },
    listContent: {
        paddingLeft: 16,
        paddingRight: 32,
        gap: 10,
    },
    card: {
        width: 110,
    },
    posterBase: {
        width: 110,
        aspectRatio: 1 / 1.45,
        borderRadius: 8,
    },
    poster: {
        backgroundColor: '#e0e0e0',
    },
    posterPlaceholder: {
        backgroundColor: '#2a2a2a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderText: {
        fontSize: 28,
        color: '#888888',
        fontWeight: '600',
    },
    title: {
        marginTop: 6,
        fontSize: 12,
        color: '#111111',
        lineHeight: 16,
    },
});

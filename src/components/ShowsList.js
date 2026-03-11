import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const numColumns = 3;
const hPadding = 12;
const itemGap = 8;

export default function ShowsList({
    data,
    activeTab,
    isLoading,
    error,
    onSelectShow,
}) {
    const renderItem = ({ item }) => {
        const title = item.name ?? 'Untitled';
        const imageUri = item.image?.medium;

        return (
            <Pressable
                style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
                onPress={() => onSelectShow?.(item)}
            >
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={[styles.posterBase, styles.poster]} resizeMode="cover" />
                ) : (
                    <View style={[styles.posterBase, styles.posterPlaceholder]}>
                        <Text style={styles.placeholderText}>{title.charAt(0)}</Text>
                    </View>
                )}
                <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
            </Pressable>
        );
    };

    let emptyLabel = activeTab === 'celebs' ? 'No celebs yet.' : 'No TV shows yet.';
    if (isLoading) {
        emptyLabel = activeTab === 'celebs' ? 'Loading celebs...' : 'Loading TV shows...';
    } else if (error) {
        emptyLabel = error;
    }

    return (
        <FlatList
            contentContainerStyle={styles.listContent}
            data={data}
            numColumns={numColumns}
            keyExtractor={(item, index) =>
                item.id ? String(item.id) : `${activeTab}-${index}`
            }
            renderItem={renderItem}
            ListEmptyComponent={
                <Text style={styles.emptyText}>{emptyLabel}</Text>
            }
            columnWrapperStyle={styles.row}
        />
    );
}

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: hPadding,
        paddingTop: 12,
        paddingBottom: 24,
        flexGrow: 1,
    },
    row: {
        gap: itemGap,
        marginBottom: itemGap,
    },
    card: {
        flex: 1,
    },
    cardPressed: {
        opacity: 0.75,
    },
    posterBase: {
        width: '100%',
        aspectRatio: 1 / 1.45,
        borderRadius: 6,
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
    cardTitle: {
        marginTop: 5,
        fontSize: 11,
        color: '#111111',
        lineHeight: 15,
    },
    emptyText: {
        color: '#777777',
    },
});

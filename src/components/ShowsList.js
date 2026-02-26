import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ShowsList({
    data,
    activeTab,
    isLoading,
    error,
    onSelectShow,
}) {
    const renderItem = ({ item }) => {
        const title = item.name ?? 'Untitled';

        let subtitle = null;
        if (activeTab === 'celebs') {
            subtitle = item.country?.name ?? null;
        } else if (item.genres?.length) {
            subtitle = item.genres.join(' • ');
        }

        return (
            <Pressable style={styles.card} onPress={() => onSelectShow?.(item)}>
                <Text style={styles.cardTitle}>{title}</Text>
                {subtitle ? <Text style={styles.cardMeta}>{subtitle}</Text> : null}
            </Pressable>
        );
    };

    let emptyLabel = 'No TV shows yet.';
    if (activeTab === 'tv' && isLoading) {
        emptyLabel = 'Loading TV shows...';
    } else if (activeTab === 'tv' && error) {
        emptyLabel = error;
    } else if (activeTab === 'celebs') {
        emptyLabel = 'No celebs yet.';
    }

    return (
        <FlatList
            contentContainerStyle={styles.listContent}
            data={data}
            keyExtractor={(item, index) =>
                item.id ? String(item.id) : `${activeTab}-${index}`
            }
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.emptyText}>{emptyLabel}</Text>}
        />
    );
}

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 24,
        flexGrow: 1,
    },
    emptyText: {
        color: '#777777',
    },
    card: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    cardTitle: {
        fontSize: 16,
        color: '#111111',
    },
    cardMeta: {
        marginTop: 4,
        fontSize: 13,
        color: '#777777',
    },
});

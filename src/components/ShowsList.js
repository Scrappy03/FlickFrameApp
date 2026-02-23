import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function ShowsList({
    data,
    activeTab,
    isLoading,
    error,
}) {
    const renderItem = ({ item }) => {
        const title = item.name ?? 'Untitled';
        const subtitle =
            activeTab === 'celebs'
                ? item.country?.name ?? null
                : item.genres?.length
                    ? item.genres.join(' • ')
                    : null;

        return (
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{title}</Text>
                {subtitle ? <Text style={styles.cardMeta}>{subtitle}</Text> : null}
            </View>
        );
    };

    const emptyLabel =
        activeTab === 'tv'
            ? isLoading
                ? 'Loading TV shows...'
                : error || 'No TV shows yet.'
            : 'No celebs yet.';

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

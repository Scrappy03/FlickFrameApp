import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const watchlistItems = [];

export default function WatchlistScreen({ onBrowseShows }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>My Watchlist</Text>
            <Text style={styles.subtitle}>Keep track of shows you want to watch next.</Text>

            {watchlistItems.length === 0 ? (
                <View style={styles.emptyCard}>
                    <Text style={styles.emptyTitle}>Your watchlist is empty</Text>
                    <Text style={styles.emptyText}>Save shows from Discover or Home to find them here.</Text>
                    <Pressable style={styles.emptyButton} onPress={onBrowseShows}>
                        <Text style={styles.emptyButtonText}>Browse shows</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.list}>
                    {watchlistItems.map((item) => (
                        <Pressable key={item.id} style={styles.listCard}>
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>{item.name}</Text>
                                <Text style={styles.cardMeta}>{item.genre}</Text>
                            </View>
                            <Text style={styles.cardAction}>Open</Text>
                        </Pressable>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 28,
        backgroundColor: '#F3F4F6',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111111',
    },
    subtitle: {
        marginTop: 6,
        fontSize: 14,
        color: '#888888',
        marginBottom: 18,
    },
    emptyCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        padding: 16,
        alignItems: 'flex-start',
    },
    emptyTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#111111',
    },
    emptyText: {
        marginTop: 8,
        fontSize: 14,
        lineHeight: 20,
        color: '#666666',
    },
    emptyButton: {
        marginTop: 14,
        backgroundColor: '#2563EB',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    emptyButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
    list: {
        gap: 10,
    },
    listCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardContent: {
        flex: 1,
        paddingRight: 12,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111111',
    },
    cardMeta: {
        marginTop: 4,
        fontSize: 13,
        color: '#777777',
    },
    cardAction: {
        fontSize: 13,
        color: '#2563EB',
        fontWeight: '600',
    },
});

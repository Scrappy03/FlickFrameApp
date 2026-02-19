import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.brand}>FlickFrame</Text>
            <Pressable style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    brand: {
        fontSize: 22,
        fontWeight: '600',
        color: '#111111',
    },
    searchButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#dddddd',
    },
    searchButtonText: {
        fontSize: 14,
        color: '#111111',
    },
});

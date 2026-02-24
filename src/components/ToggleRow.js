import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ToggleRow({ activeTab, onChange }) {
    return (
        <View style={styles.row}>
            <Pressable
                onPress={() => onChange('tv')}
                style={[styles.item, activeTab === 'tv' && styles.itemActive]}
            >
                <Text style={[styles.text, activeTab === 'tv' && styles.textActive]}>
                    TV
                </Text>
            </Pressable>
            <Pressable
                onPress={() => onChange('celebs')}
                style={[styles.item, activeTab === 'celebs' && styles.itemActive]}
            >
                <Text style={[styles.text, activeTab === 'celebs' && styles.textActive]}>
                    Celebs
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        marginHorizontal: 16,
        marginTop: 8,
        padding: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    itemActive: {
        backgroundColor: '#f2f2f2',
    },
    text: {
        fontSize: 14,
        color: '#555555',
    },
    textActive: {
        color: '#111111',
    },
});

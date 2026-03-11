import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ToggleRow({ activeTab, onChange }) {
    return (
        <View style={styles.row}>
            <Pressable
                onPressIn={() => onChange('tv')}
                style={[styles.item, activeTab === 'tv' && styles.itemActive]}
            >
                <Text style={[styles.text, activeTab === 'tv' && styles.textActive]}>
                    TV
                </Text>
            </Pressable>
            <Pressable
                onPressIn={() => onChange('celebs')}
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
        marginBottom: 12,
        padding: 3,
        borderRadius: 8,
        backgroundColor: '#e6e6e6ea',
        flexDirection: 'row',
        gap: 3,
    },
    item: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    itemActive: {
        backgroundColor: '#ffffff',

    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B6B6B',
    },
    textActive: {
        color: '#292929',
        fontWeight: '600',
    },
});

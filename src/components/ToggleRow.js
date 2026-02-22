import { Pressable, StyleSheet, Text, View } from 'react-native';

const toggleOptions = [
    { id: 'movies', label: 'Movies' },
    { id: 'tv', label: 'TV' },
    { id: 'celebs', label: 'Celebs' },
];

export default function ToggleRow({ activeTab, onChange }) {
    return (
        <View style={styles.row}>
            {toggleOptions.map((option) => {
                const isActive = option.id === activeTab;

                return (
                    <Pressable
                        key={option.id}
                        onPress={() => onChange(option.id)}
                        style={[styles.item, isActive && styles.itemActive]}
                    >
                        <Text style={[styles.text, isActive && styles.textActive]}>
                            {option.label}
                        </Text>
                    </Pressable>
                );
            })}
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

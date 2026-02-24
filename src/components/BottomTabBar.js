import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Home, Compass, Bookmark, User } from 'lucide-react-native';

const tabs = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'discover', label: 'Discover', Icon: Compass },
    { id: 'watchlist', label: 'Watchlist', Icon: Bookmark },
    { id: 'profile', label: 'Profile', Icon: User },
];

export default function BottomTabBar({ activeTab, onChange }) {
    return (
        <View style={styles.container}>
            {tabs.map(({ id, label, Icon }) => {
                const isActive = id === activeTab;
                const color = isActive ? '#2563EB' : '#888888';

                return (
                    <Pressable
                        key={id}
                        onPress={() => onChange(id)}
                        style={styles.tab}
                    >
                        <Icon size={24} color={color} />
                        <Text style={[styles.label, isActive && styles.labelActive]}>
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#e6e6e6',
        backgroundColor: '#ffffff',
        paddingBottom: 8,
        paddingTop: 8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
    },
    label: {
        fontSize: 11,
        color: '#888888',
    },
    labelActive: {
        color: '#2563EB',
    },
});

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Search, Bell } from 'lucide-react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.brand}>
                <Text style={styles.brandBlue}>Flick</Text>Frame
            </Text>
            <View style={styles.icons}>
                <Pressable style={styles.iconButton}>
                    <Search size={22} color="#111111" />
                </Pressable>
                <Pressable style={styles.iconButton}>
                    <Bell size={22} color="#111111" />
                </Pressable>
            </View>
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
        backgroundColor: '#ffffff',
    },
    brand: {
        fontSize: 28,
        fontFamily: 'Oswald_600SemiBold',
        color: '#111111',
    },
    brandBlue: {
        color: '#2563EB',
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconButton: {
        padding: 6,
    },
});

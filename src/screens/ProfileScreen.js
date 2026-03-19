import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>Manage your account and app preferences.</Text>

            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>AT</Text>
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>Admin Test</Text>
                    <Text style={styles.email}>admin.test@flickframe.app</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Settings</Text>
                <Pressable style={styles.rowButton}>
                    <Text style={styles.rowLabel}>Edit profile</Text>
                    <Text style={styles.rowValue}>Open</Text>
                </Pressable>
                <Pressable style={styles.rowButton}>
                    <Text style={styles.rowLabel}>Notifications</Text>
                    <Text style={styles.rowValue}>On</Text>
                </Pressable>
                <Pressable style={styles.rowButton}>
                    <Text style={styles.rowLabel}>Theme</Text>
                    <Text style={styles.rowValue}>Light</Text>
                </Pressable>
                <Pressable style={styles.rowButton}>
                    <Text style={styles.rowLabel}>Help and support</Text>
                    <Text style={styles.rowValue}>Open</Text>
                </Pressable>
            </View>

            <Pressable style={styles.signOutButton}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </Pressable>
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
    profileCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
    },
    profileInfo: {
        marginLeft: 12,
        flex: 1,
    },
    name: {
        fontSize: 17,
        fontWeight: '600',
        color: '#111111',
    },
    email: {
        marginTop: 4,
        fontSize: 13,
        color: '#777777',
    },
    section: {
        marginTop: 18,
        gap: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111111',
    },
    rowButton: {
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
    rowLabel: {
        fontSize: 15,
        color: '#111111',
        fontWeight: '500',
    },
    rowValue: {
        fontSize: 13,
        color: '#777777',
    },
    signOutButton: {
        marginTop: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d4d4d4',
        paddingVertical: 11,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    signOutText: {
        fontSize: 14,
        color: '#B91C1C',
        fontWeight: '600',
    },
});

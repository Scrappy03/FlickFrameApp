import { StyleSheet, Text, View } from 'react-native';

export default function DiscoverScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Discover Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F6',
    },
    text: {
        fontSize: 18,
        color: '#888888',
    },
});

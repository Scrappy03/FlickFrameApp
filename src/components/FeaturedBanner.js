import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function stripHtml(text) {
    if (!text) return null;
    return text
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<[^>]*>/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

export default function FeaturedBanner({
    show,
    onPress,
    onPrimaryAction,
    onSecondaryAction,
    primaryActionLabel = 'View Details',
    secondaryActionLabel = 'Browse Shows',
}) {
    const image = show?.image?.original ?? show?.image?.medium ?? null;
    const summary = stripHtml(show?.summary);
    const hasActions = Boolean(onPrimaryAction || onSecondaryAction);

    if (!image) return null;

    return (
        <Pressable onPress={onPress} style={styles.banner}>
            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.overlay}
            >
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>FEATURED SERIES</Text>
                </View>

                <Text style={styles.title} numberOfLines={2}>
                    {(show?.name ?? '').toUpperCase()}
                </Text>

                {summary ? (
                    <Text style={styles.summary} numberOfLines={2}>
                        {summary}
                    </Text>
                ) : null}

                {hasActions && (
                    <View style={styles.buttons}>
                        {onPrimaryAction && (
                            <Pressable
                                onPress={(event) => {
                                    event.stopPropagation();
                                    onPrimaryAction();
                                }}
                                style={[styles.button, styles.primaryButton]}
                            >
                                <Text style={styles.primaryButtonText}>{primaryActionLabel}</Text>
                            </Pressable>
                        )}

                        {onSecondaryAction && (
                            <Pressable
                                onPress={(event) => {
                                    event.stopPropagation();
                                    onSecondaryAction();
                                }}
                                style={[styles.button, styles.secondaryButton]}
                            >
                                <Text style={styles.secondaryButtonText}>{secondaryActionLabel}</Text>
                            </Pressable>
                        )}
                    </View>
                )}
            </LinearGradient>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    banner: {
        width: '100%',
        aspectRatio: 2 / 3,
        backgroundColor: '#111111',
    },
    image: { width: '100%', height: '100%' },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '65%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 24,
    },
    badge: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 8,
    },
    badgeText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    title: {
        fontFamily: 'Oswald_600SemiBold',
        fontSize: 40,
        color: '#ffffff',
        textAlign: 'center',
    },
    summary: {
        marginTop: 6,
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        textAlign: 'center',
        lineHeight: 19,
    },
    buttons: { flexDirection: 'row', gap: 12, marginTop: 16 },
    button: { flex: 1, paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
    primaryButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.25)',
    },
    primaryButtonText: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
    secondaryButton: { backgroundColor: '#2563EB' },
    secondaryButtonText: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
});

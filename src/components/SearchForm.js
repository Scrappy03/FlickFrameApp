import { useState, useRef, useEffect } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Search, X } from 'lucide-react-native';

export default function SearchForm({ onSearch, type, shouldFocus }) {
    const [text, setText] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (shouldFocus) {
            inputRef.current?.focus();
        }
    }, [shouldFocus]);

    const submitHandler = () => {
        Keyboard.dismiss();
        if (text.trim()) {
            onSearch(text.trim());
        }
    };

    const clearHandler = () => {
        setText('');
        onSearch('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <Search size={16} color="#999999" style={styles.searchIcon} />
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder={`Search ${type}...`}
                    placeholderTextColor="#777777"
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={submitHandler}
                    returnKeyType="search"
                />
                {text.length > 0 ? (
                    <Pressable style={styles.clearButton} onPress={clearHandler}>
                        <X size={16} color="#999999" />
                    </Pressable>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
        lineHeight: 0,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#111111',
    },
    clearButton: {
        padding: 4,
        marginLeft: 4,
    },
});

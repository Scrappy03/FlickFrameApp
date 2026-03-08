import React, { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Search, X } from 'lucide-react-native';

export default function SearchForm({ onSearch, activeQuery, type }) {
    const [text, setText] = useState('');

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
                <TextInput
                    style={styles.input}
                    placeholder={`Search ${type}...`}
                    placeholderTextColor="#999999"
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={submitHandler}
                    returnKeyType="search"
                />
                {activeQuery ? (
                    <Pressable style={styles.clearButton} onPress={clearHandler}>
                        <X size={18} color="#555555" />
                    </Pressable>
                ) : null}
                <Pressable style={styles.searchButton} onPress={submitHandler}>
                    <Search size={18} color="#ffffff" />
                </Pressable>
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
        borderColor: '#e6e6e6',
        borderRadius: 8,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
    },
    input: {
        flex: 1,
        height: 42,
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#111111',
    },
    clearButton: {
        width: 36,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButton: {
        width: 42,
        height: 42,
        backgroundColor: '#111111',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

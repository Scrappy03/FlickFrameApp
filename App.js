import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Header from './src/components/Header';
import ToggleRow from './src/components/ToggleRow';

export default function App() {
  const [activeTab, setActiveTab] = useState('movies');
  const listDataByTab = {
    movies: [],
    tv: [],
    celebs: [],
  };
  const listData = listDataByTab[activeTab] ?? [];

  const renderItem = ({ item }) => {
    const title = item.name ?? item.show?.name ?? item.person?.name ?? 'Untitled';
    const subtitle = item.show?.genres?.length ? item.show.genres.join(' • ') : null;

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle ? <Text style={styles.cardMeta}>{subtitle}</Text> : null}
      </View>
    );
  };

  const emptyLabel =
    activeTab === 'movies'
      ? 'No movies yet.'
      : activeTab === 'tv'
        ? 'No TV shows yet.'
        : 'No celebs yet.';

  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StatusBar style="dark" />
        <Header />
        <ToggleRow activeTab={activeTab} onChange={setActiveTab} />
        <FlatList
          contentContainerStyle={styles.listContent}
          data={listData}
          keyExtractor={(item, index) =>
            item.id ? String(item.id) : `${activeTab}-${index}`
          }
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>{emptyLabel}</Text>}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    flexGrow: 1,
  },
  emptyText: {
    color: '#777777',
  },
  card: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  cardTitle: {
    fontSize: 16,
    color: '#111111',
  },
  cardMeta: {
    marginTop: 4,
    fontSize: 13,
    color: '#777777',
  },
});

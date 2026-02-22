import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Header from './src/components/Header';
import ShowsList from './src/components/ShowsList';
import ToggleRow from './src/components/ToggleRow';

export default function App() {
  const [activeTab, setActiveTab] = useState('movies');
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getShows = () => {
    setIsLoading(true);
    setError(null);

    fetch('https://api.tvmaze.com/shows?page=0')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`TVMaze request failed (${response.status})`);
        }

        return response.json();
      })
      .then((json) => {
        setShows(json);
      })
      .catch((err) => {
        setError('Failed to load TV shows.');
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getShows();
  }, []);

  const listDataByTab = {
    movies: [],
    tv: shows,
    celebs: [],
  };
  const listData = listDataByTab[activeTab] ?? [];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StatusBar style="dark" />
        <Header />
        <ToggleRow activeTab={activeTab} onChange={setActiveTab} />
        <ShowsList
          data={listData}
          activeTab={activeTab}
          isLoading={isLoading}
          error={error}
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
});

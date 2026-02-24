import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Oswald_600SemiBold } from '@expo-google-fonts/oswald';

import { getPeoplePage, getShowsPage } from './src/api/tvmaze';
import BottomTabBar from './src/components/BottomTabBar';
import Header from './src/components/Header';
import ShowsList from './src/components/ShowsList';
import ToggleRow from './src/components/ToggleRow';

export default function App() {
  const [fontsLoaded] = useFonts({ Oswald_600SemiBold });

  const [activeScreen, setActiveScreen] = useState('home');

  const [activeTab, setActiveTab] = useState('tv');
  const [shows, setShows] = useState([]);
  const [celebs, setCelebs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab === 'tv' && shows.length === 0) {
      setLoading(true);
      setError(null);
      getShowsPage(0)
        .then((response) => setShows(response))
        .catch(() => setError('Failed to load TV shows.'))
        .finally(() => setLoading(false));
    }

    if (activeTab === 'celebs' && celebs.length === 0) {
      setLoading(true);
      setError(null);
      getPeoplePage(0)
        .then((response) => setCelebs(response))
        .catch(() => setError('Failed to load celebs.'))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  const listData = activeTab === 'tv' ? shows : celebs;

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StatusBar style="dark" />
        <Header />
        <ToggleRow activeTab={activeTab} onChange={setActiveTab} />
        <ShowsList
          data={listData}
          activeTab={activeTab}
          isLoading={loading}
          error={error}
        />
        <BottomTabBar activeTab={activeScreen} onChange={setActiveScreen} />
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

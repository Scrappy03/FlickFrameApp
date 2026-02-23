import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { getPeoplePage, getShowsPage } from './src/api/tvmaze';
import Header from './src/components/Header';
import ShowsList from './src/components/ShowsList';
import ToggleRow from './src/components/ToggleRow';

export default function App() {
  const [activeTab, setActiveTab] = useState('tv');
  const [shows, setShows] = useState([]);
  const [celebs, setCelebs] = useState([]);
  const [loadingByTab, setLoadingByTab] = useState({
    tv: false,
    celebs: false,
  });
  const [errorByTab, setErrorByTab] = useState({
    tv: null,
    celebs: null,
  });

  const updateTabLoading = (tab, value) => {
    setLoadingByTab((prev) => ({ ...prev, [tab]: value }));
  };

  const updateTabError = (tab, value) => {
    setErrorByTab((prev) => ({ ...prev, [tab]: value }));
  };

  const getShows = () => {
    updateTabLoading('tv', true);
    updateTabError('tv', null);

    getShowsPage(0)
      .then((response) => {
        setShows(response);
      })
      .catch((err) => {
        updateTabError('tv', 'Failed to load TV shows.');
        console.error(err);
      })
      .finally(() => {
        updateTabLoading('tv', false);
      });
  };

  const getCelebs = () => {
    updateTabLoading('celebs', true);
    updateTabError('celebs', null);

    getPeoplePage(0)
      .then((response) => {
        setCelebs(response);
      })
      .catch((err) => {
        updateTabError('celebs', 'Failed to load celebs.');
        console.error(err);
      })
      .finally(() => {
        updateTabLoading('celebs', false);
      });
  };

  useEffect(() => {
    if (activeTab === 'tv' && shows.length === 0 && !loadingByTab.tv) {
      getShows();
    }

    if (activeTab === 'celebs' && celebs.length === 0 && !loadingByTab.celebs) {
      getCelebs();
    }
  }, [activeTab]);

  const listDataByTab = {
    tv: shows,
    celebs,
  };
  const listData = listDataByTab[activeTab] ?? [];
  const isLoading = loadingByTab[activeTab];
  const error = errorByTab[activeTab];

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

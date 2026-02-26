import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Oswald_600SemiBold } from '@expo-google-fonts/oswald';

import { getPeoplePage, getShowsPage } from './src/api/tvmaze';
import BottomTabBar from './src/components/BottomTabBar';
import Header from './src/components/Header';
import DiscoverScreen from './src/screens/DiscoverScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ShowDetailScreen from './src/screens/ShowDetailScreen';
import WatchlistScreen from './src/screens/WatchlistScreen';

const Stack = createNativeStackNavigator();

function MainScreen({ navigation }) {
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
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <Header />
      {activeScreen === 'home' && (
        <HomeScreen
          navigation={navigation}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          data={listData}
          isLoading={loading}
          error={error}
        />
      )}
      {activeScreen === 'discover' && <DiscoverScreen />}
      {activeScreen === 'watchlist' && <WatchlistScreen />}
      {activeScreen === 'profile' && <ProfileScreen />}
      <BottomTabBar activeTab={activeScreen} onChange={setActiveScreen} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="ShowDetail" component={ShowDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

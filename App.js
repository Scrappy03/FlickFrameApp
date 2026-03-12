import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
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
  const [focusSearch, setFocusSearch] = useState(0);

  useEffect(() => {
    if (activeScreen !== 'discover') {
      setFocusSearch(0);
    }
  }, [activeScreen]);
  const [activeTab, setActiveTab] = useState('tv');
  const [shows, setShows] = useState([]);
  const [celebs, setCelebs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([getShowsPage(0), getPeoplePage(0)])
      .then(([showsData, celebsData]) => {
        setShows(showsData);
        setCelebs(celebsData);
      })
      .catch(() => setError('Failed to load content.'))
      .finally(() => setLoading(false));
  }, []);

  const listData = activeTab === 'tv' ? shows : celebs;

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <Header activeScreen={activeScreen} onSearchPress={() => { setActiveScreen('discover'); setFocusSearch(n => n + 1); }} />
      <View style={styles.content}>
        {activeScreen === 'home' && <HomeScreen navigation={navigation} />}
        {activeScreen === 'discover' && (
          <DiscoverScreen
            navigation={navigation}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            data={listData}
            isLoading={loading}
            error={error}
            focusSearch={focusSearch}
          />
        )}
        {activeScreen === 'watchlist' && <WatchlistScreen />}
        {activeScreen === 'profile' && <ProfileScreen />}
      </View>
      <BottomTabBar activeTab={activeScreen} onChange={setActiveScreen} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: '#ffffff' }}>
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
  content: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
});

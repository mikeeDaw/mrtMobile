import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  AppState,
  BackHandler,
  DeviceEventEmitter,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types/Types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoggedView from './pages/LoggedView';
import Pin from './pages/Pin';
import Register from './pages/Register';
import {storage} from './store/Storage';
import TimeOut from './components/TimeOut';
import TimeOutModal from './components/TimeOutModal';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator<RootStackParamList>();
  const BotTab = createBottomTabNavigator();
  const [logged, setLogged] = useState(false);
  const [showTimeOut, setShowTimeOut] = useState(false);
  // For background closing
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const subscription = AppState.addEventListener('change', nextAppState => {
      clearTimeout(timeout);

      if (appState.current === 'background') {
        console.log('back');
        // timeout = setTimeout(() => BackHandler.exitApp(), 3000);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    DeviceEventEmitter.addListener('SetLogOut', () => {
      setLogged(false);
    });
    DeviceEventEmitter.addListener('SetLogIn', () => {
      setLogged(true);
    });
    return () => {
      DeviceEventEmitter.removeAllListeners('SetLogOut');
      DeviceEventEmitter.removeAllListeners('SetLogIn');
    };
  }, []);
  return (
    <>
      <NavigationContainer>
        {logged ? (
          <TimeOut setShowTimeOut={setShowTimeOut}>
            {showTimeOut && (
              <TimeOutModal setTimeOut={setShowTimeOut} setLog={setLogged} />
            )}
            <Stack.Navigator>
              <Stack.Screen name="PinSuccess" options={{headerShown: false}}>
                {props => <LoggedView {...props} setLog={setLogged} />}
              </Stack.Screen>
            </Stack.Navigator>
          </TimeOut>
        ) : (
          <Stack.Navigator
            initialRouteName={storage.getString('PIN') ? 'Login' : 'Register'}>
            <Stack.Screen name="Login" options={{headerShown: false}}>
              {props => <Pin {...props} />}
            </Stack.Screen>

            <Stack.Screen name="Register" options={{headerShown: false}}>
              {props => <Register {...props} setLog={setLogged} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
        {/* <Stack.Navigator
          initialRouteName={storage.getString('PIN') ? 'Register' : 'Login'}>
          {logged ? (
            <Stack.Screen name="PinSuccess" options={{headerShown: false}}>
              {props => <LoggedView {...props} setLog={setLogged} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                options={{headerShown: false}}
                initialParams={{setLog: setLogged}}>
                {props => <Pin {...props} setLog={setLogged} />}
              </Stack.Screen>

              <Stack.Screen name="Register" options={{headerShown: false}}>
                {props => <Register />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator> */}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

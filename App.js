import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import HomeStackScreen from './screens/HomeStackScreen';
import ProtectedScreen from './screens/ProtectedScreen';
import SignInScreen from './screens/SignInScreen';
import { AuthProvider } from './context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated ? (
            <Stack.Screen name="Main" component={MainTabs} />
          ) : (
            <Stack.Screen name="SignIn" component={SignInScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="My Cab" component={ProtectedScreen} />
  </Tab.Navigator>
);

export default App;

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Ionicons } from 'react-native-vector-icons'; // Import Ionicons

import HomeStackScreen from './screens/HomeStackScreen';
import ProtectedScreen from './screens/ProtectedScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import { AuthProvider } from './context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="Main" component={MainTabs} />
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'My Ride') {
          iconName = 'car';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="My Ride" component={ProtectedScreen} />
  </Tab.Navigator>
);

export default App;

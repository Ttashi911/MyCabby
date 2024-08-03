import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Ionicons } from 'react-native-vector-icons';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import HomeStackScreen from './screens/HomeStackScreen';
import ProtectedScreen from './screens/ProtectedScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import { AuthProvider, AuthContext } from './context/AuthContext';

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

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'My Ride') {
            iconName = 'car';
          } else if (route.name === 'Sign Out') {
            iconName = 'log-out';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="My Ride" component={ProtectedScreen} />
      <Tab.Screen
        name="Sign Out"
        component={SignOutScreen}
        options={{
          tabBarButton: (props) => <SignOutButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const SignOutButton = (props) => {
  const { signOut } = useContext(AuthContext);

  const handlePress = () => {
    Alert.alert(
      'Confirm Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            signOut();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity
      {...props}
      onPress={handlePress}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name="log-out" size={24} color={props.color} />
        <Text style={{ color: props.color, fontSize: 10 }}>Sign Out</Text>
      </View>
    </TouchableOpacity>
  );
};

const SignOutScreen = () => {
  return null;
};

export default App;

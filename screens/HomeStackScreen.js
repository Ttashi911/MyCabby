import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CabsListScreen from './CabsListScreen';
import CabDetailScreen from './CabDetailScreen';
import MyCabScreen from './MyCabScreen'; // Ensure correct import

const Stack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Cabs List">
      <Stack.Screen name="Cabs List" component={CabsListScreen} options={{ title: 'Available Cabs' }} />
      <Stack.Screen name="Cab Detail" component={CabDetailScreen} options={{ title: 'Cab Detail' }} />
      <Stack.Screen name="My Cabs" component={MyCabScreen} options={{ title: 'My Bookings' }} />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;

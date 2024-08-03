import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CabsListScreen from './CabsListScreen';
import CabDetailScreen from './CabDetailScreen';
import MyCabScreen from './MyCabScreen';

const Stack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Cabs List">
      <Stack.Screen 
        name="Cabs List" 
        component={CabsListScreen} 
        options={{ title: 'Available Cabs' }} 
      />
      <Stack.Screen 
        name="Cab Detail" 
        component={CabDetailScreen} 
        options={({ navigation }) => ({
          title: 'Cab Detail',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerLeft}
            >
              <View style={styles.headerLeftContent}>
                <Icon name="arrow-back" size={24} color="black" />
                <Text style={styles.headerLeftText}>Back</Text>
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen 
        name="My Cabs" 
        component={MyCabScreen} 
        options={{ title: 'My Bookings' }} 
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 10,
  },
  headerLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default HomeStackScreen;

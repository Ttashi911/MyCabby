import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import MyCabScreen from './MyCabScreen';

const ProtectedScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (!isAuthenticated) {
    return <Text>User not authenticated</Text>;
  }

  return (
    <View>
      <MyCabScreen />
    </View>
  );
};

export default ProtectedScreen;

import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import MyCabScreen from './MyCabScreen';

const ProtectedScreen = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <MyCabScreen />

        </>
      ) : (
        <Text style={styles.message}>Please sign in to access this screen.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#007bff',
  },
});

export default ProtectedScreen;

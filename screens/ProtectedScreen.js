import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import MyCabScreen from './MyCabScreen';

const ProtectedScreen = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View>
      {user ? (
        <>
          <MyCabScreen />
          <Button title="Sign Out" onPress={signOut} />
        </>
      ) : (
        <Text>Please sign in to access this screen.</Text>
      )}
    </View>
  );
};

export default ProtectedScreen;

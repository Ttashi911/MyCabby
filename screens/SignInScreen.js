import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const SignInScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Alert', 'Please enter email and password!');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Alert', 'Please enter a valid email address.');
      return;
    }

    try {
      await signIn(email, password);
      // Navigate to the next screen or handle successful sign-in
    } catch (err) {
      // Handle Firebase authentication errors
      if (err.code === 'auth/invalid-email') {
        Alert.alert('Alert', 'The email address is badly formatted.');
      } else if (err.code === 'auth/wrong-password') {
        Alert.alert('Alert', 'Incorrect password. Please try again.');
      } else if (err.code === 'auth/user-not-found') {
        Alert.alert('Alert', 'No account found with this email address.');
      } else if (err.code === 'auth/invalid-credential') {
        // Suppress logging for this error
        // Display a generic message instead
        Alert.alert('Alert', 'The email or password is incorrect.');
      } else {
        Alert.alert('Alert', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#343a40',
  },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  error: {
    marginTop: 8,
    color: '#e63946',
    textAlign: 'center',
  },
});

export default SignInScreen;

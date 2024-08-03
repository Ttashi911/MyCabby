import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
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
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        Alert.alert('Alert', 'The email address is badly formatted.');
      } else if (err.code === 'auth/wrong-password') {
        Alert.alert('Alert', 'Incorrect password. Please try again.');
      } else if (err.code === 'auth/user-not-found') {
        Alert.alert('Alert', 'No account found with this email address.');
      } else if (err.code === 'auth/invalid-credential') {
        Alert.alert('Alert', 'The email or password is incorrect.');
      } else {
        Alert.alert('Alert', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cabby</Text>
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
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.signInButton]} onPress={handleSignIn}>
          <Text style={styles.buttonTitle}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonTitle}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#d1d5db',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signInButton: {
    backgroundColor: '#007bff',
  },
  signUpButton: {
    backgroundColor: '#007bff',
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default SignInScreen;

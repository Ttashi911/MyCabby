import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Alert', 'Please enter email and password!');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'The email address is badly formatted.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Password Error', 'The password is too weak. Please use at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Alert', 'Passwords do not match');
      return;
    }

    try {
      await signUp(email, password);
      navigation.navigate('SignIn');
    } catch (err) {
      let errorMessage = 'An error occurred. Please try again.';
      if (err.code === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid.';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'The email address is already in use.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak. Please use at least 6 characters.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      }
      Alert.alert('Sign Up Error', errorMessage);
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSignUp}>
          <Text style={styles.buttonTitle}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonTitle}>Back</Text>
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
  button: {
    paddingVertical: 8, 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    marginHorizontal: 4, 
  },
  signUpButton: {
    backgroundColor: '#ff6347',
  },
  backButton: {
    backgroundColor: '#ff6347', 
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginTop: 16,
  },
});

export default SignUpScreen;

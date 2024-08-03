import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Alert', 'Please enter email and password!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await signUp(email, password);
      navigation.navigate('SignIn');
    } catch (err) {
      setError(err.message);
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
        {error ? <Text style={styles.error}>{error}</Text> : null}
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
    backgroundColor: '#007bff',
  },
  backButton: {
    backgroundColor: '#007bff', 
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  error: {
    marginTop: 8,
    color: '#e63946',
    textAlign: 'center',
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginTop: 16,
  },
});

export default SignUpScreen;

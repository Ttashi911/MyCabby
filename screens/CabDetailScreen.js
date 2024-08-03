import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getCabDetail, bookCab, getUserBookings } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

const CabDetailScreen = () => {
  const route = useRoute();
  const { cabId } = route.params;
  const [cab, setCab] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchCabDetail = async () => {
        const cabDetail = await getCabDetail(cabId);
        setCab(cabDetail);
      };
      const fetchUserBookings = async () => {
        const bookings = await getUserBookings();
        setUserBookings(bookings);
      };
      fetchCabDetail();
      fetchUserBookings();
    }
  }, [cabId, user]);

  const handleBookCab = async () => {
    if (userBookings.length >= 2) {
      Alert.alert('Alert', 'You cannot book more than 2 cabs at a time.');
    } else {
      await bookCab(cabId);
      Alert.alert('Success', 'Cab booked successfully!');
      const bookings = await getUserBookings();
      setUserBookings(bookings);
    }
  };

  if (!user) return <Text style={styles.message}>Please sign in to book a cab.</Text>;

  return (
    <View style={styles.container}>
      {cab ? (
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Icon name="car" size={24} color="black" />
            <Text style={styles.label}>Company: </Text>
            <Text style={styles.value}>{cab.companyName}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="settings" size={24} color="black" />
            <Text style={styles.label}>Model: </Text>
            <Text style={styles.value}>{cab.carModel}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="people" size={24} color="black" />
            <Text style={styles.label}>Passengers: </Text>
            <Text style={styles.value}>{cab.passengers}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="star" size={24} color="black" />
            <Text style={styles.label}>Rating: </Text>
            <Text style={styles.value}>{cab.rating}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="cash-outline" size={24} color="black" />
            <Text style={styles.label}>Cost/hour: </Text>
            <Text style={styles.value}>{cab.costPerHour}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleBookCab}>
            <Text style={styles.buttonText}>Book Ride</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.message}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailsContainer: {
    width: '100%',
    maxWidth: 275,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#ff6347',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default CabDetailScreen;

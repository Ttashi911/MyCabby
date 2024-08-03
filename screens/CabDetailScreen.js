import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getCabDetail, bookCab, getUserBookings } from '../firebase';
import { AuthContext } from '../context/AuthContext';

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
        <>
          <Text style={styles.label}>Company: <Text style={styles.value}>{cab.companyName}</Text></Text>
          <Text style={styles.label}>Model: <Text style={styles.value}>{cab.carModel}</Text></Text>
          <Text style={styles.label}>Passengers: <Text style={styles.value}>{cab.passengers}</Text></Text>
          <Text style={styles.label}>Rating: <Text style={styles.value}>{cab.rating}</Text></Text>
          <Text style={styles.label}>Cost/hour: <Text style={styles.value}>{cab.costPerHour}</Text></Text>
          <Button title="Book Ride" onPress={handleBookCab} />
        </>
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
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontWeight: 'normal',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default CabDetailScreen;

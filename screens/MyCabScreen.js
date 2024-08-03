import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { getUserBookings, cancelBooking } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const MyCabScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const userBookings = await getUserBookings();
        setBookings(userBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = (bookingId) => {
    Alert.alert(
      'Confirm Cancellation',
      'Are you sure you want to cancel this booking?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await cancelBooking(bookingId);
              const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
              setBookings(updatedBookings);
              alert('Booking cancelled successfully!');
            } catch (error) {
              console.error('Error cancelling booking:', error);
              alert('Error cancelling booking.');
            }
          }
        }
      ]
    );
  };

  if (!user) return <Text style={styles.message}>Please sign in to view your bookings.</Text>;
  if (loading) return <ActivityIndicator size="large" color="#007bff" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <Text style={styles.label}>Company: <Text style={styles.value}>{item.companyName}</Text></Text>
            <Text style={styles.label}>Model: <Text style={styles.value}>{item.carModel}</Text></Text>
            <Text style={styles.label}>Cost/hour: <Text style={styles.value}>{item.costPerHour}</Text></Text>
            <View style={styles.buttonContainer}>
              <Button title="Cancel Booking" onPress={() => handleCancelBooking(item.id)} color="#ffffff" />
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.message}>No bookings yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  bookingItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontWeight: 'normal',
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
  },
  buttonContainer: {
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ff6347',
  },
});

export default MyCabScreen;

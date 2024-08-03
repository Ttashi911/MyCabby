import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, TouchableOpacity } from 'react-native';
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
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Company:</Text>
              <Text style={styles.value}>{item.companyName}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Model:</Text>
              <Text style={styles.value}>{item.carModel}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Cost/hour:</Text>
              <Text style={styles.value}>{item.costPerHour}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => handleCancelBooking(item.id)}
              >
                <Text style={styles.buttonText}>Cancel Booking</Text>
              </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingItem: {
    width: 300,
    maxWidth: 500,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginLeft: 70,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#ff6347',
    borderWidth: 1,
    borderColor: '#ff6347',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default MyCabScreen;

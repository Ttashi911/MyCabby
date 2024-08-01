import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { getUserBookings, cancelBooking, isUserAuthenticated } from '../firebase';

const MyCabScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!isUserAuthenticated()) {
        setError('User not authenticated');
        return;
      }
      try {
        const userBookings = await getUserBookings();
        setBookings(userBookings);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.companyName} - {item.carModel}</Text>
            <Button title="Cancel Booking" onPress={() => handleCancelBooking(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default MyCabScreen;

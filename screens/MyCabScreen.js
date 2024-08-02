import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import { getUserBookings, cancelBooking } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const MyCabScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      const userBookings = await getUserBookings();
      setBookings(userBookings);
      setLoading(false);
    };
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    await cancelBooking(bookingId);
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
    alert('Booking cancelled successfully!');
  };

  if (!user) return <Text>Please sign in to view your bookings.</Text>;
  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Company: {item.companyName}</Text>
            <Text>Model: {item.carModel}</Text>
            <Button title="Cancel Booking" onPress={() => handleCancelBooking(item.id)} />
          </View>
        )}
        ListEmptyComponent={<Text>No bookings yet.</Text>}
      />
    </View>
  );
};

export default MyCabScreen;

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button } from 'react-native';
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
      alert('You cannot book more than 2 cabs at a time.');
    } else {
      await bookCab(cabId);
      alert('Cab booked successfully!');
      const bookings = await getUserBookings();
      setUserBookings(bookings);
    }
  };

  if (!cab) return <Text>Loading...</Text>;
  if (!user) return <Text>Please sign in to book a cab.</Text>;

  return (
    <View>
      <Text>Company: {cab.companyName}</Text>
      <Text>Model: {cab.carModel}</Text>
      <Text>Passengers: {cab.passengers}</Text>
      <Text>Rating: {cab.rating}</Text>
      <Text>Cost/hour: {cab.costPerHour}</Text>
      <Button title="Book Cab" onPress={handleBookCab} />
    </View>
  );
};

export default CabDetailScreen;

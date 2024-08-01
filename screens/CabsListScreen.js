import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCabs } from '../firebase';

const CabsListScreen = () => {
  const [cabs, setCabs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const cabsData = await getCabs();
      setCabs(cabsData);
    };
    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={cabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Cab Detail', { cabId: item.id })}>
            <Text>{item.companyName} - {item.carModel}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CabsListScreen;

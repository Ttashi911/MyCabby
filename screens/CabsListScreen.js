import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <FlatList
        data={cabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item}
            onPress={() => navigation.navigate('Cab Detail', { cabId: item.id })}>
            <Text style={styles.itemText}>{item.companyName} - {item.carModel}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.message}>No cabs available.</Text>}
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
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ced4da',
  },
  itemText: {
    fontSize: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default CabsListScreen;

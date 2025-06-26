import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Museums'>;

export type Museum = {
  id: number;
  name: string;
  description: string;
  dateFoundation: Date;
  contact: string;
  address: number; // ID do endereço
};

const MuseumsScreen = ({ navigation }: Props) => {

  const [Museums, setMuseums] = useState<Museum[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMuseums = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/museus/');
    const data = await response.json();
    setMuseums(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchMuseums();
    }, [])
  );

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/museus/${id}/`, {
      method: 'DELETE',
    });
    setMuseums(prev => prev.filter(c => c.id !== id));
  };

  const renderItem = ({ item }: { item: Museum }) => (
    <View style={styles.card}>
      <Text style={styles.name}>ID: {item.id}</Text>
      <Text style={styles.name}>Nome: {item.name}</Text>
      <Text style={styles.description}>Descrição: {item.description}</Text>
      <Text style={styles.dateFoundation}>Fundação: {item.dateFoundation}</Text>
      <Text style={styles.contact}>Contato: {item.contact}</Text>
      <Text style={styles.address}>Endereço (ID): {item.address}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('MuseumsEdit', { museum: item })}
      >
      <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
      <Text style={styles.editText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Museus</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={Museums}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('MuseumsCreate')}
    >
      <Ionicons name="add" size={28} color="#fff"  />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginLeft: 250,
  },
    name: {
      fontSize: 18,
      fontWeight: '600',
      color: '#222',
    },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  dateFoundation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  contact: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  address: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },

  editButton: {
    backgroundColor: '#4B7BE5',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  editText: { 
    color: '#fff', 
    fontWeight: '500' 
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0D47A1',
    borderRadius: 28,
    padding: 14,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#E54848',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  row: { 
    flexDirection: 'row', 
    marginTop: 8, 
    alignSelf: 'flex-end' 
  },
});

export default MuseumsScreen;
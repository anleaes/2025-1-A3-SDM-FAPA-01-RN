import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Visitors'>;

export type Visitor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthdate: Date;
  gender: string;
};

const VisitorsScreen = ({ navigation }: Props) => {

  const [Visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVisitors = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/visitantes/');
    const data = await response.json();
    setVisitors(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchVisitors();
    }, [])
  );

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/visitantes/${id}/`, {
      method: 'DELETE',
    });
    setVisitors(prev => prev.filter(c => c.id !== id));
  };

  const renderItem = ({ item }: { item: Visitor }) => (
    <View style={styles.card}>
      <Text style={styles.name}>ID: {item.id}</Text>
      <Text style={styles.name}>Nome: {item.name}</Text>
      <Text style={styles.email}>E-mail: {item.email}</Text>
      <Text style={styles.phone}>Telefone: {item.phone}</Text>
      <Text style={styles.birthdate}>Aniversário: {item.birthdate}</Text>
      <Text style={styles.gender}>Gênero: {item.gender}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('VisitorsEdit', { visitor: item })}
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
      <Text style={styles.title}>Visitantes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={Visitors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('VisitorsCreate')}
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
  birthdate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  gender: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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

export default VisitorsScreen;
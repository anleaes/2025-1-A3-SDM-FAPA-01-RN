import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Pieces'>;

export type Piece = {
  id: number;
  name: string;
  description: string;
  year: number;
  artist: number; // ID artista
  movement: number; // ID movimento
};

const PiecesScreen = ({ navigation }: Props) => {

  const [Pieces, setPieces] = useState<Piece[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPieces = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/obras/');
    const data = await response.json();
    setPieces(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPieces();
    }, [])
  );

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/obras/${id}/`, {
      method: 'DELETE',
    });
    setPieces(prev => prev.filter(c => c.id !== id));
  };

  const renderItem = ({ item }: { item: Piece }) => (
    <View style={styles.card}>
      <Text style={styles.name}>ID: {item.id}</Text>
      <Text style={styles.name}>Nome: {item.name}</Text>
      <Text style={styles.description}>Descrição: {item.description}</Text>
      <Text style={styles.year}>Ano: {item.year}</Text>
      <Text style={styles.artist}>Artista (ID): {item.artist}</Text>
      <Text style={styles.movement}>Movimento (ID): {item.movement}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('PiecesEdit', { piece: item })}
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
      <Text style={styles.title}>Obras</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={Pieces}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('PiecesCreate')}
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
  year: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  artist: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  movement: {
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

export default PiecesScreen;
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'PiecesEdit'>;

const PiecesEditScreen = ({ route, navigation }: Props) => {
  const { piece } = route.params;
  const [name, setName] = useState(piece.name);
  const [description, setDescription] = useState(piece.description);
  const [year, setYear] = useState(piece.year);
  const [artist, setArtist] = useState(piece.artist);
  const [movement, setMovement] = useState(piece.movement);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(piece.name);
    setDescription(piece.description);
    setYear(piece.year);
    setArtist(piece.artist);
    setMovement(piece.movement);
  }, [piece]);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/obras/${piece.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, year, artist, movement }),
      }
    );
    navigation.navigate('Pieces');        
    setSaving(false);  
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.label}>Nome </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        multiline
      />
      <Text style={styles.label}>Descricão</Text>
      <TextInput
        value={description.toString()}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <Text style={styles.label}>Ano</Text>
      <TextInput
        value={year.toString()}
        onChangeText={text => setYear(Number(text))}
        style={styles.input}
        multiline
      />
      <Text style={styles.label}>Artista (ID)</Text>
      <TextInput
        value={artist.toString()}
        onChangeText={text => setArtist(Number(text))}
        style={styles.input}
      />
      <Text style={styles.label}>Movimento (ID)</Text>
      <TextInput
        value={movement.toString()}
        onChangeText={text => setMovement(Number(text))}
        style={styles.input}
        multiline
      />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Pieces')} />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff' ,
    marginLeft: 250,
  },
  label: { 
    fontWeight: 'bold', 
    marginTop: 12, 
    marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default PiecesEditScreen;
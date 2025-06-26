import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EventsEdit'>;

const EventsEditScreen = ({ route, navigation }: Props) => {

  const { event } = route.params;
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [year, setYear] = useState(event.year);
  const [museum, setMuseum] = useState(event.museum);
  const [pieces, setPieces] = useState(event.pieces);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(event.name);
    setDescription(event.description);
    setYear(event.year);
    setMuseum(event.museum);
    setPieces(event.pieces);
  }, [event]);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/eventos/${event.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, year, museum, pieces }),
      }
    );
    navigation.navigate('Events');        
    setSaving(false);  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <Text style={styles.label}>Ano</Text>
      <TextInput
        value={year.toString()}
        onChangeText={text => setYear(Number(text))}
        style={styles.input}
      />
      <Text style={styles.label}>Museu (ID)</Text>
      <TextInput
        value={museum.toString()}
        onChangeText={text => setMuseum(Number(text))}
        style={styles.input}
      />
      <Text style={styles.label}>Obras (IDs)</Text>
      <TextInput
        value={pieces.join(', ')}
        onChangeText={text => setPieces(text.split(', ').map(id => Number(id)))}
        style={styles.input}
      />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Events')} />
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

export default EventsEditScreen;
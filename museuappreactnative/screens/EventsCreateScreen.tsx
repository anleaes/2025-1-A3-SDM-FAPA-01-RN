// NÃO FUNCIONA
// Provavelmente algo relacionado aos múltiplos ID's

import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EventsCreate'>;

const EventsCreateScreen = ({ navigation }: Props) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(0);
  const [museum, setMuseum] = useState(0);
  const [pieces, setPieces] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setName('');
      setDescription('');
      setYear(0);
      setMuseum(0);
      setPieces([]);
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/eventos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, year, museum, pieces }),
    });
    navigation.navigate('Events');  
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Evento</Text>
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
        style={[styles.input]}
      />
      <Text style={styles.label}>Museu (ID)</Text>
      <TextInput
        value={museum.toString()}
        onChangeText={text => setMuseum(Number(text))}
        style={[styles.input]}
      />
      <Text style={styles.label}>Obras (IDs)</Text>
      <TextInput
        value={pieces.join(', ')}
        onChangeText={text => setPieces(text.split(', ').map(id => Number(id)))}
        style={[styles.input]}
      />
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Events')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff',
    marginLeft: 250,
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 12, 
    alignSelf: 'center' },
  label: { 
    fontWeight: '600', 
    marginTop: 12, 
    marginBottom: 4 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default EventsCreateScreen;
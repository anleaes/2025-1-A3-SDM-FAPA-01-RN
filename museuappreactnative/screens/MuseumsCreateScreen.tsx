// NÃO FUNCIONA
// Provavelmente algo relacionado com a data de fundação do museu

import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'MuseumsCreate'>;

const MuseumsCreateScreen = ({ navigation }: Props) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateFoundation, setDateFoundation] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState(0);
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setName('');
      setDescription('');
      setDateFoundation('');
      setContact('');
      setAddress(0);
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/museus/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, dateFoundation, contact, address }),
    });
    navigation.navigate('Museums');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo museu*</Text>
      <Text style={styles.title}>NÃO FUNCIONA NO MOMENTO. Provavelmente algo relacionado com a data de fundação do museu</Text>
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
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <Text style={styles.label}>Data de fundação</Text>
      <TextInput
        value={dateFoundation}
        onChangeText={setDateFoundation}
        style={[styles.input]}
      />
      <Text style={styles.label}>Contato</Text>
      <TextInput
        value={contact}
        onChangeText={setContact}
        style={styles.input}
      />
      <Text style={styles.label}>Endereço (ID)</Text>
      <TextInput
        value={address.toString()}
        onChangeText={text => setAddress(Number(text))}
        style={[styles.input]}
      />
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Museums')} />
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

export default MuseumsCreateScreen;
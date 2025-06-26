import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'MuseumsEdit'>;

const MuseumsEditScreen = ({ route, navigation }: Props) => {
  const { museum } = route.params;
  const [name, setName] = useState(museum.name);
  const [description, setDescription] = useState(museum.description);
  const [dateFoundation, setDateFoundation] = useState(museum.dateFoundation);
  const [contact, setContact] = useState(museum.contact);
  const [address, setAddress] = useState(museum.address);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(museum.name);
    setDescription(museum.description);
    setDateFoundation(museum.dateFoundation);
    setContact(museum.contact);
    setAddress(museum.address);
  }, [museum]);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/museus/${museum.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, dateFoundation, contact, address }),
      }
    );
    navigation.navigate('Museums');        
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
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <Text style={styles.label}>Data de fundação</Text>
      <TextInput
        value={dateFoundation}
        onChangeText={setDateFoundation}
        style={styles.input}
      />
      <TextInput
        value={contact}
        onChangeText={setContact}
        style={styles.input}
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Museums')} />
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

export default MuseumsEditScreen;
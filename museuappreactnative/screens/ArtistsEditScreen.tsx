import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'ArtistsEdit'>;

const ArtistsEditScreen = ({ route, navigation }: Props) => {
  const { artist } = route.params;
  const [name, setName] = useState(artist.name);
  const [birthdate, setBirthdate] = useState(artist.birthdate);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(artist.name);
    setBirthdate(artist.birthdate);
  }, [artist]);  

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/movimentos/${artist.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, birthdate }),
      }
    );
    navigation.navigate('Artists');        
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
      <Text style={styles.label}>Aniversário</Text>
      <TextInput // MUDAR PARA DATA
        value={birthdate}
        onChangeText={setBirthdate}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Artists')} />
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

export default ArtistsEditScreen;
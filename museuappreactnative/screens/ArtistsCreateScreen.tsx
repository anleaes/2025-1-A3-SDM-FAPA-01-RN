import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'ArtistsCreate'>;

const ArtistsCreateScreen = ({ navigation }: Props) => {

  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setName('');
      setBirthdate('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/artistas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, birthdate }),
    });
    navigation.navigate('Artists');  
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo artista</Text>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.label}>Ano de nascimento</Text>
      <TextInput
        value={birthdate}
        onChangeText={setBirthdate}
        style={[styles.input]}
      />
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
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

export default ArtistsCreateScreen;
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'AddressesCreate'>;

const AddressesCreateScreen = ({ navigation }: Props) => {

  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setStreet('');
      setNumber('');
      setCountry('');
      setCity('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/enderecos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ street, number, country, city }),
    });
    navigation.navigate('Addresses');  
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo endereço</Text>
      <Text style={styles.label}>Rua</Text>
      <TextInput
        value={street}
        onChangeText={setStreet}
        style={styles.input}
      />
      <Text style={styles.label}>Número</Text>
      <TextInput
        value={number}
        onChangeText={setNumber}
        style={styles.input}
      />
      <Text style={styles.label}>País</Text>
      <TextInput
        value={country}
        onChangeText={setCountry}
        style={[styles.input]}
      />
      <TextInput
        value={city}
        onChangeText={setCity}
        style={[styles.input]}
      />
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Addresses')} />
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

export default AddressesCreateScreen;
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'AddressesEdit'>;

const AddressesEditScreen = ({ route, navigation }: Props) => {
  const { address } = route.params;
  const [street, setStreet] = useState(address.street);
  const [number, setNumber] = useState(address.number);
  const [country, setCountry] = useState(address.country);
  const [city, setCity] = useState(address.city);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setStreet(address.street);
    setNumber(address.number);
    setCountry(address.country);
    setCountry(address.city);
  }, [address]);  

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/enderecos/${address.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ street, number, country, city }),
      }
    );
    navigation.navigate('Addresses');        
    setSaving(false);  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={street}
        onChangeText={setStreet}
        style={styles.input}
      />
      <Text style={styles.label}>Número</Text>
      <TextInput
        value={number}
        onChangeText={setNumber}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <Text style={styles.label}>País</Text>
      <TextInput
        value={country}
        onChangeText={setCountry}
        style={styles.input}
      />
      <Text style={styles.label}>Cidade</Text>
      <TextInput
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Addresses')} />
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

export default AddressesEditScreen;
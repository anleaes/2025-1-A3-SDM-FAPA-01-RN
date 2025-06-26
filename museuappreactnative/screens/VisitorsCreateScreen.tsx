// NÃO FUNCIONA
// Provavelmente algo relacionado ao gênero do usuário

import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'VisitorsCreate'>;

const VisitorsCreateScreen = ({ navigation }: Props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setName('');
      setEmail('');
      setPhone('');
      setBirthdate('');
      setGender('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/visitantes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, birthdate, gender }),
    });
    navigation.navigate('Visitors');  
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo visitante*</Text>
      <Text style={styles.title}>NÃO FUNCIONA NO MOMENTO. Provavelmente algo relacionado ao gênero do usuário</Text>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        multiline
      />
      <Text style={styles.label}>Telefone: </Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        style={[styles.input]}
      />
      <Text style={styles.label}>Aniversário: </Text>
      <TextInput
        value={birthdate}
        onChangeText={setBirthdate}
        style={[styles.input]}
      />
      <Text style={styles.label}>Gênero: </Text>
      <TextInput
        value={gender}
        onChangeText={setGender}
        style={[styles.input]}
      />
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Visitors')} />
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

export default VisitorsCreateScreen;
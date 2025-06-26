import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'VisitorsEdit'>;

const VisitorsEditScreen = ({ route, navigation }: Props) => {

  const { visitor } = route.params;
  const [name, setName] = useState(visitor.name);
  const [email, setEmail] = useState(visitor.email);
  const [phone, setPhone] = useState(visitor.phone);
  const [birthdate, setBirthdate] = useState(visitor.birthdate);
  const [gender, setGender] = useState(visitor.gender);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(visitor.name);
    setEmail(visitor.email);
    setPhone(visitor.phone);
    setBirthdate(visitor.birthdate);
    setGender(visitor.gender);
  }, [visitor]);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/visitantes/${visitor.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, birthdate, gender }),
      }
    );
    navigation.navigate('Visitors');        
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
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        multiline
      />
      <Text style={styles.label}>Telefone</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <Text style={styles.label}>Aniversário</Text>
      <TextInput
        value={birthdate}
        onChangeText={setBirthdate}
        style={styles.input}
        multiline
      />
      <Text style={styles.label}>Gênero</Text>
      <TextInput
        value={gender}
        onChangeText={setGender}
        style={styles.input}
        multiline
      />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Visitors')} />
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

export default VisitorsEditScreen;
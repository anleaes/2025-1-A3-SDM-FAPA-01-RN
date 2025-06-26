import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'OrdersCreate'>;

const OrdersCreateScreen = ({ navigation }: Props) => {
  
  const [payment_method, setPaymentMethod] = useState('');
  const [status, setStatus] = useState('');
  const [visitor, setVisitor] = useState(0);
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setPaymentMethod('');
      setStatus('');
      setVisitor(0);
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/pedidos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payment_method, status, visitor }),
    });
    navigation.navigate('Orders');  
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo movimento</Text>
      <Text style={styles.label}>Método de Pagamento</Text>
      <TextInput
        value={payment_method}
        onChangeText={setPaymentMethod}
        style={styles.input}
      />
      <Text style={styles.label}>Status</Text>
      <TextInput
        value={status}
        onChangeText={setStatus}
        style={styles.input}
        multiline
      />
      <Text style={styles.label}>Visitante (ID)</Text>
      <TextInput
        value={visitor.toString()}
        onChangeText={text => setVisitor(Number(text))}
        style={[styles.input]}
      />
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Orders')} />
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

export default OrdersCreateScreen;
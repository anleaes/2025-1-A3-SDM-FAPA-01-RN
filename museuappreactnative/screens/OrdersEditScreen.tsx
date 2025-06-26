import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'OrdersEdit'>;

const OrdersEditScreen = ({ route, navigation }: Props) => {
  const { order } = route.params;
  const [payment_method, setPaymentMethod] = useState(order.payment_method);
  const [status, setStatus] = useState(order.status);
  const [visitor, setVisitor] = useState(order.visitor);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setPaymentMethod(order.payment_method);
    setStatus(order.status);
    setVisitor(order.visitor);
  }, [order]);  

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/pedidos/${order.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_method, status, visitor }),
      }
    );
    navigation.navigate('Orders');        
    setSaving(false);  
  };

  return (
    <View style={styles.container}>
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
        value={visitor}
        onChangeText={setVisitor}
        style={styles.input}
      />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Orders')} />
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

export default OrdersEditScreen;
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'OrderItemsCreate'>;

const OrderItemsCreateScreen = ({ navigation }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const [unitary_price, setUnitaryPrice] = useState(0);
  const [piece, setPiece] = useState(0);
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setQuantity(0);
      setUnitaryPrice(0);
      setPiece(0);
      setOrder(0);
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/itens_pedido/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity, unitary_price, piece, order }),
    });
    navigation.navigate('OrderItems');  
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo movimento</Text>
      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        value={quantity.toString()}
        onChangeText={text => setQuantity(Number(text))}
        style={styles.input}
      />
      <Text style={styles.label}>Preço Unitário</Text>
      <TextInput
        value={unitary_price.toString()}
        onChangeText={text => setUnitaryPrice(Number(text))}
        style={styles.input}
        multiline
      />
      <Text style={styles.label}>Obra (ID)</Text>
      <TextInput
        value={piece.toString()}
        onChangeText={text => setPiece(Number(text))}
        style={[styles.input]}
      />
      <Text style={styles.label}>Pedido (ID)</Text>
      <TextInput
        value={order.toString()}
        onChangeText={text => setOrder(Number(text))}
        style={[styles.input]}
      />
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('OrderItems')} />
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

export default OrderItemsCreateScreen;
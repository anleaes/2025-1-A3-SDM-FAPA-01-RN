import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'OrderItemsEdit'>;

const OrderItemsEditScreen = ({ route, navigation }: Props) => {
  const { orderitem } = route.params;
  const [quantity, setQuantity] = useState(orderitem.quantity);
  const [unitary_price, setUnitaryPrice] = useState(orderitem.unitary_price);
  const [piece, setPiece] = useState(orderitem.piece);
  const [order, setOrder] = useState(orderitem.order);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setQuantity(orderitem.quantity);
    setUnitaryPrice(orderitem.unitary_price);
    setPiece(orderitem.piece);
    setOrder(orderitem.order);
  }, [orderitem]);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/itens_pedido/${orderitem.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity, unitary_price, piece, order }),
      }
    );
    navigation.navigate('OrderItems');        
    setSaving(false);  
  };

  return (
    <View style={styles.container}>
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
      <Text style={styles.label}>Peça (ID)</Text>
      <TextInput
        value={piece.toString()}
        onChangeText={text => setPiece(Number(text))}
        style={styles.input}
      />
      <Text style={styles.label}>Pedido (ID)</Text>
      <TextInput
        value={order.toString()}
        onChangeText={text => setOrder(Number(text))}
        style={styles.input}
      />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('OrderItems')} />
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

export default OrderItemsEditScreen;
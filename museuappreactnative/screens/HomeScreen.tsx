import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';



type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>MuseuApp</Text>
    <Text style={styles.label}>Aplicativo para gerenciamento de eventos de museus e pedidos de obras</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff',
    marginLeft: 250,
    justifyContent: 'center',
    alignItems: 'center'
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
});

export default HomeScreen;
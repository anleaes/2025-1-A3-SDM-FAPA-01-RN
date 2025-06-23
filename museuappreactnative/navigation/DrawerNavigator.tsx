import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import MovementsScreen, { Movement } from '../screens/MovementsScreen';
import MovementsCreateScreen from '../screens/MovementsCreateScreen';
import MovementsEditScreen from '../screens/MovementsEditScreen';
import HomeScreen from '../screens/HomeScreen';

export type DrawerParamList = {
  Home: undefined;
  Movements: undefined;
  MovementsCreate: undefined; 
  MovementsEdit: { movement: Movement };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#4B7BE5',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#4B7BE5' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color}  />,
          title: 'Início',
        }}
      />
      <Drawer.Screen
        name="Movements"
        component={MovementsScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
          title: 'Movimentos',
        }}
      />
      <Drawer.Screen
        name="MovementsCreate"
        component={MovementsCreateScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo Movimento' }}
      />
      <Drawer.Screen
        name="MovementsEdit"
        component={MovementsEditScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Movimento' }}
      />
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;
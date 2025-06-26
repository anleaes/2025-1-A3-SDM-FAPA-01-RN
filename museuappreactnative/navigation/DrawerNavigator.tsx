import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import AddressesScreen , { Address } from '../screens/AddressesScreen';
import AddressesCreateScreen from '../screens/AddressesCreateScreen';
import AddressesEditScreen from '../screens/AddressesEditScreen';
import ArtistsScreen , { Artist } from '../screens/ArtistsScreen';
import ArtistsCreateScreen from '../screens/ArtistsCreateScreen';
import ArtistsEditScreen from '../screens/ArtistsEditScreen';
import EventsScreen, { Event } from '../screens/EventsScreen';
import EventsCreateScreen from '../screens/EventsCreateScreen';
import EventsEditScreen from '../screens/EventsEditScreen';
import MovementsScreen, { Movement } from '../screens/MovementsScreen';
import MovementsCreateScreen from '../screens/MovementsCreateScreen';
import MovementsEditScreen from '../screens/MovementsEditScreen';
import MuseumsScreen, { Museum } from '../screens/MuseumsScreen';
import MuseumsCreateScreen from '../screens/MuseumsCreateScreen';
import MuseumsEditScreen from '../screens/MuseumsEditScreen';
import OrdersScreen, { Order } from '@/screens/OrdersScreen';
import OrdersCreateScreen from '../screens/OrdersCreateScreen';
import OrdersEditScreen from '../screens/OrdersEditScreen';
import OrderItemsScreen, { OrderItem } from '../screens/OrderItemsScreen';
import OrderItemsCreateScreen from '../screens/OrderItemsCreateScreen';
import OrderItemsEditScreen from '../screens/OrderItemsEditScreen';
import PiecesScreen, { Piece } from '../screens/PiecesScreen';
import PiecesCreateScreen from '../screens/PiecesCreateScreen';
import PiecesEditScreen from '@/screens/PiecesEditScreen';
import VisitorsScreen , { Visitor } from '../screens/VisitorsScreen';
import VisitorsCreateScreen from '@/screens/VisitorsCreateScreen';
import VisitorsEditScreen from '@/screens/VisitorsEditScreen';
import HomeScreen from '../screens/HomeScreen';


export type DrawerParamList = {
  Home: undefined;

  Artists: undefined;
  ArtistsCreate: undefined; 
  ArtistsEdit: { artist: Artist };

  Addresses: undefined;
  AddressesCreate: undefined; 
  AddressesEdit: { address: Address };

  Events: undefined;
  EventsCreate: undefined;
  EventsEdit: { event: Event };
  
  Movements: undefined;
  MovementsCreate: undefined; 
  MovementsEdit: { movement: Movement };

  Museums: undefined;
  MuseumsCreate: undefined;
  MuseumsEdit: { museum: Museum };

  Pieces: undefined;
  PiecesCreate: undefined;
  PiecesEdit: { piece: Piece };

  Orders: undefined;
  OrdersCreate: undefined;
  OrdersEdit: { order: Order };

  OrderItems: undefined;
  OrderItemsCreate: undefined;
  OrderItemsEdit: { orderitem: OrderItem };

  Visitors: undefined;
  VisitorsCreate: undefined;
  VisitorsEdit: { visitor: Visitor };
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
        name="Artists"
        component={ArtistsScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="brush-outline" size={size} color={color} />,
          title: 'Artistas',
        }}
      />
      <Drawer.Screen
        name="ArtistsCreate"
        component={ArtistsCreateScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo Artista' }}
      />
      <Drawer.Screen
        name="ArtistsEdit"
        component={ArtistsEditScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Artista' }}
      />

      <Drawer.Screen
        name="Addresses"
        component={AddressesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="map-outline" size={size} color={color} />,
          title: 'Endereços',
        }}
      />
      <Drawer.Screen
        name="AddressesCreate"
        component={AddressesCreateScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo Endereço' }}
      />
      <Drawer.Screen
        name="AddressesEdit"
        component={AddressesEditScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Endereço' }}
      />

      <Drawer.Screen
        name="Events"
        component={EventsScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
          title: 'Eventos',
        }}
      />
      <Drawer.Screen
        name="EventsCreate"
        component={EventsCreateScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo Evento' }}
      />
      <Drawer.Screen
        name="EventsEdit"
        component={EventsEditScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Evento' }}
      />

      <Drawer.Screen
        name="OrderItems"
        component={OrderItemsScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="images-outline" size={size} color={color} />,
          title: 'Itens pedidos',
        }}
      />
      <Drawer.Screen
        name="OrderItemsCreate"
        component={OrderItemsCreateScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo Item de Pedido' }}
      />
      <Drawer.Screen
        name="OrderItemsEdit"
        component={OrderItemsEditScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Item de Pedido' }}
      />

      <Drawer.Screen
        name="Movements"
        component={MovementsScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="move-outline" size={size} color={color} />,
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

      <Drawer.Screen
        name="Museums"
        component={MuseumsScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="business-outline" size={size} color={color} />,
          title: 'Museus',
        }}
      />
      <Drawer.Screen
        name="MuseumsCreate"
        component={MuseumsCreateScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo Museu' }}
      />
      <Drawer.Screen
        name="MuseumsEdit"
        component={MuseumsEditScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Museu' }}
      />

      <Drawer.Screen
        name="Pieces"
        component={PiecesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="image-outline" size={size} color={color} />,
          title: 'Obras',
        }}
      />
      <Drawer.Screen
        name="PiecesCreate"
        component={PiecesCreateScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo Pedido' }}
      />
      <Drawer.Screen
        name="PiecesEdit"
        component={PiecesEditScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Pedido' }}
      />

      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />,
          title: 'Pedidos',
        }}
      />
      <Drawer.Screen
        name="OrdersCreate"
        component={OrdersCreateScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo Pedido' }}
      />
      <Drawer.Screen
        name="OrdersEdit"
        component={OrdersEditScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Pedido' }}
      />

      <Drawer.Screen
        name="Visitors"
        component={VisitorsScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          title: 'Visitantes',
        }}
      />
      <Drawer.Screen
        name="VisitorsCreate"
        component={VisitorsCreateScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo Visitante' }}
      />
      <Drawer.Screen
        name="VisitorsEdit"
        component={VisitorsEditScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Visitante' }}
      />
    </Drawer.Navigator>

  );
};

export default DrawerNavigator;
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/gato.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Olá, Usuário!</Text>
      </View>
      <View style={{ flex: 1, paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#4B7BE5',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CustomDrawerContent;

// import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import React from 'react';
// import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// const CustomDrawerContent = (props: any) => {
//   return (
//     <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
//       <View style={styles.header}>
//         <Image
//           source={require('../assets/images/gato.png')}
//           style={styles.avatar}
//         />
//         <Text style={styles.name}>Olá, Usuário!</Text>
//       </View>
//       <View style={{ flex: 1, paddingTop: 10 }}>
//         <DrawerItemList {...props} />
//       </View>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => props.navigation.closeDrawer()}
//       >
//         <Text style={styles.buttonText}>Fechar Menu</Text>
//       </TouchableOpacity>
//     </DrawerContentScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     padding: 20,
//     backgroundColor: '#4B7BE5',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 10,
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   name: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   button: {
//     backgroundColor: '#4B7BE5',
//     padding: 15,
//     margin: 20,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default CustomDrawerContent;
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableHighlight, Alert} from 'react-native';
import React, { Component } from 'react';
// import { Header } from 'react-native-elements';
// import { Left, Right, Icon } from 'native-base';



export default function App() {
  return (

    // <TouchableHighlight onPress={() => this.moveToAddNewCustomer()}>
    //     <Image style={styles.imagestyle} source={require('./ic_action_name.png')} />
    // </TouchableHighlight>


    <View style={styles.container}>
      <TouchableHighlight onPress={() => Alert.alert("Hello Ryan!")}>
        <Image
          source={require('./images/hamburger_icon.png')}
          style={{width: 40, height: 40, marginTop: 60, marginLeft: 30}}
        />
      </TouchableHighlight>
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    fontSize: 64,
  },
});

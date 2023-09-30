import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableHighlight, Alert, Dimensions} from 'react-native';
import React, { Component, useState } from 'react';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FrequencySlider = (props) => {
  const [value, setValue] = useState(props.value ?? 0);
  return (
    <View>
      <Text style={{textAlign: "center"}}>{value && +value}</Text>
      <Slider
        step={0.5}
        style={styles.slider}
        {...props}
        value={value}
        onValueChange={setValue}
      />
    </View>
  );
};

export default class App extends Component {

  alert_ryan(){
    Alert.alert("Hello Ryan!")
  }

  render(){
    return (
      <View>
        <TouchableHighlight onPress={this.alert_ryan}>
          <Image
            source={require('./images/hamburger_icon.png')}
            style={{width: 40, height: 40, marginTop: 60, marginLeft: 30}}
          />
        </TouchableHighlight>

        <Text style={{fontSize: 32, marginTop: 32, textAlign: "center"}}>
          Audible Frequency
        </Text>

        <Text style={{fontSize: 16, marginTop: 16, textAlign: "center"}}>
          Lowest Frequency
        </Text>

        <FrequencySlider
          style={{marginTop: 16, height: 100}}
          minimumValue={50}
          maximumValue={5000}
          minimumTrackTintColor="#92C3F0"
          maximumTrackTintColor="#F6F3F3"
          value={100}
        />

        <Text style={{fontSize: 16, marginTop: 16, textAlign: "center"}}>
          Highest Frequency
        </Text>

        <FrequencySlider
          style={{marginTop: 16, height: 100}}
          minimumValue={50}
          maximumValue={5000}
          minimumTrackTintColor="#F6F3F3"
          maximumTrackTintColor="#92C3F0"
          value={3000}
        />

        <StatusBar style="auto" />
      </View>
    );
  }
}






const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 32,
  },
});

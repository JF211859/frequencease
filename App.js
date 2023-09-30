import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableHighlight, Alert, Dimensions, Button} from 'react-native';
import React, { Component, useState } from 'react';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function FrequencyAdjusterPage (props) {

  const [min_frequency, setMinFrequency] = useState(100);
  const [max_frequency, setMaxFrequency] = useState(3000);

  const navigation = () => {
    Alert.alert("Place Navigation Here");
  }

  return (
    <View>
        <TouchableHighlight onPress={navigation}>
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

        <Text style = {{textAlign: "center"}}>{min_frequency}</Text>

        <Slider
          style={{marginTop: 16, height: 100}}
          minimumValue={50}
          maximumValue={5000}
          minimumTrackTintColor="#92C3F0"
          maximumTrackTintColor="#F6F3F3"
          value={100}
          onValueChange={setMinFrequency}
          step={1}
        />

        <Text style={{fontSize: 16, marginTop: 16, textAlign: "center"}}>
          Highest Frequency
        </Text>

        <Text style = {{textAlign: "center"}}>{max_frequency}</Text>

        <Slider
          style={{marginTop: 16, height: 100}}
          minimumValue={50}
          maximumValue={5000}
          minimumTrackTintColor="#92C3F0"
          maximumTrackTintColor="#F6F3F3"
          value={3000}
          onValueChange={setMaxFrequency}
          step={1}
        />

        <StatusBar style="auto" />
      </View>
  );
};

export default class App extends Component {


  render(){

    return (
      <FrequencyAdjusterPage>

      </FrequencyAdjusterPage>
    );
  }
}

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  Button,
  Touchable,
} from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import SwitchSelector from "react-native-switch-selector";
import { Audio } from "expo-av";
import { COLORS } from "../Style/colorScheme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from '@iconify/react';
import playIcon from '@iconify/icons-ion/play';
import stopIcon from '@iconify/icons-ion/stop';
import replayMusic from '@iconify/icons-icon-park-solid/replay-music';
import { 
  IoPlay,
  IoPause,
  IoStop,
  IoReload
 } from "react-icons/io5";
// import { styles } from "../Style/styles";

// This should be the home screen when app opens
export default function FrequencyAdjuster() {
  const [min_frequency, setMinFrequency] = useState(100);
  const [max_frequency, setMaxFrequency] = useState(3000);

  const onRecord = () => {
    Alert.alert("Recording");
  };

  const onPlayBack = () => {
    Alert.alert("PlayingBack");
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../audio/test.mp3")
    );
    await sound.playAsync();
    console.log("Sound Played");
  }

  return (
    <View>
      <Text style={styles.h1}>Audible Frequency</Text>

      <View style={[styles.margin, {height: 50}, styles.row]}>
        <View style={{ 
          backgroundColor: COLORS.GREY,
          width: 50 }} />
        <View style={{ 
          backgroundColor: COLORS.LIGHT_BLUE,
          width: 200 }} />
        <View style={{ 
          backgroundColor: COLORS.GREY,
          width: 50 }} />
      </View>

      <Slider
        style={styles.slider}
        minimumValue={50}
        maximumValue={5000}
        minimumTrackTintColor={COLORS.MEDIUM_BLUE}
        maximumTrackTintColor={COLORS.LIGHT_GREY}
        value={100}
        onValueChange={setMinFrequency}
        step={1}
      />


      <SwitchSelector
        options={[
          { label: "Auto", value: "A" },
          { label: "Manual", value: "M" },
        ]}
        initial={0}
        onPress={value => console.log('SwitchSelector')}
        buttonColor={COLORS.LIGHT_BLUE}
        backgroundColor={COLORS.WHITE}
        animationDuration={300}
        textStyle={{color: COLORS.GREY}}
        selectedTextStyle={{color: COLORS.BLACK}}
        style={styles.margin}
      />

      <Slider
        style={[styles.slider, styles.margin]}
        minimumValue={50}
        maximumValue={5000}
        minimumTrackTintColor={COLORS.MEDIUM_BLUE}
        maximumTrackTintColor={COLORS.LIGHT_GREY}
        value={3000}
        onValueChange={setMaxFrequency}
        step={1}
      />
      
      <View style={[styles.row, styles.audioButtons, styles.margin]}>
        <TouchableOpacity style={styles.circleButton} onPress={playSound}>
          <Text>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
          <Text>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
          <Text>Reload</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.row, styles.fileButtons, styles.margin]}>
        <TouchableOpacity style={styles.button} onPress={onRecord} >
          <Text>Record</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Text>Import File</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}


/*
<Text style={styles.h2}>Lowest Frequency</Text>
<Text style={{ textAlign: "center" }}>{min_frequency}</Text>
<Text style={styles.h2}>Highest Frequency</Text>
<Text style={{ textAlign: "center" }}>{max_frequency}</Text>

<TouchableOpacity style={styles.circleButton} onPress={playSound}>
  <Icon icon={playIcon} />
</TouchableOpacity>
<TouchableOpacity style={styles.circleButton}>
  <Icon icon={stopIcon} />
</TouchableOpacity>
<TouchableOpacity style={styles.circleButton}>
  <Icon icon={replayMusic} />
</TouchableOpacity> */


// use React Native's StyleSheet for styling
// ex)    style={styles.example}
const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    marginTop: 32,
    textAlign: "center",
  },
  h2: {
    fontSize: 24,
    marginTop: 32,
    textAlign: "center",
  },
  body: {
    fontSize: 16
  },
  button: {
    backgroundColor: COLORS.LIGHT_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  circleButton: {
    backgroundColor: COLORS.LIGHT_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  audioButtons: {
    justifyContent: 'space-around',
    marginBottom: 20
  },
  fileButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  slider: {
    height: 100,
  },
  margin: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15
  },
  hide: {
    display: 'none'
  }
});

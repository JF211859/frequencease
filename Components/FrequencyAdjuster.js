import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  Button,
} from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { COLORS } from "../Style/colorScheme";

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
      <Text style={{ fontSize: 32, marginTop: 32, textAlign: "center" }}>
        Audible Frequency
      </Text>

      <Text style={styles.title}>Lowest Frequency</Text>

      <Text style={{ textAlign: "center" }}>{min_frequency}</Text>

      <Slider
        style={{ marginTop: 16, height: 100 }}
        minimumValue={50}
        maximumValue={5000}
        minimumTrackTintColor={COLORS.MEDIUM_BLUE}
        maximumTrackTintColor={COLORS.LIGHT_GREY}
        value={100}
        onValueChange={setMinFrequency}
        step={1}
      />

      <Text style={styles.title}>Highest Frequency</Text>

      <Text style={{ textAlign: "center" }}>{max_frequency}</Text>

      <Slider
        style={{ marginTop: 16, height: 100 }}
        minimumValue={50}
        maximumValue={5000}
        minimumTrackTintColor={COLORS.MEDIUM_BLUE}
        maximumTrackTintColor={COLORS.LIGHT_GREY}
        value={3000}
        onValueChange={setMaxFrequency}
        step={1}
      />

      <Button onPress={onRecord} title="record" />

      <Button onPress={playSound} title="playback" />

      <StatusBar style="auto" />
    </View>
  );
}
// use React Native's StyleSheet for styling
// ex)    style={styles.example}
const styles = StyleSheet.create({
  example: { width: 40, height: 40, marginTop: 60, marginLeft: 30 },
  title: { fontSize: 16, marginTop: 16, textAlign: "center" },
});

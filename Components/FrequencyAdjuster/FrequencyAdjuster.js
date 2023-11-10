import { StatusBar } from "expo-status-bar";
import { Text, View, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import SwitchSelector from "react-native-switch-selector"; // https://www.npmjs.com/package/react-native-switch-selector
import { COLORS } from "../../Style/colorScheme";
import styles from "../../Style/styles";
import SoundPlayer from "./AdjusterPlayer";

// This should be the home screen when app opens
export default function FrequencyAdjuster() {
  // TODO: user's hearing range
  const [minFrequency, setMinFrequency] = useState(100); // store the range the audio should be in
  const [maxFrequency, setMaxFrequency] = useState(15000);

  const onRecord = () => {
    Alert.alert("Recording");
  };

  const onImport = () => {
    Alert.alert("Import file");
  };

  return (
    <View>
      <Text style={[styles.h1, styles.center]}>Audible Frequency</Text>

      <View style={[styles.margin, styles.row]}>
        <View
          style={{
            backgroundColor: COLORS.GREY,
            width: 50,
            height: 25,
          }}
        />
        <View
          style={{
            backgroundColor: COLORS.LIGHT_BLUE,
            width: 200,
            height: 25,
          }}
        />
        <View
          style={{
            backgroundColor: COLORS.GREY,
            width: 50,
            height: 25,
          }}
        />
      </View>
      <View
        style={[styles.margin, styles.row, { justifyContent: "space-between" }]}
      >
        <Text>{minFrequency} Hz</Text>
        <Text>{maxFrequency} Hz</Text>
      </View>

      {/* <Text>Select the mode here</Text>
      <SwitchSelector
        options={[
          { label: "Auto", value: "A" },
          { label: "Manual", value: "M" },
        ]}
        initial={0}
        onPress={(value) => console.log("SwitchSelector")}
        buttonColor={COLORS.LIGHT_BLUE}
        backgroundColor={COLORS.WHITE}
        animationDuration={300}
        fontSize={20}
        textStyle={{ color: COLORS.GREY }}
        selectedTextStyle={{ color: COLORS.BLACK }}
        style={styles.margin}
      />
      <Slider
        style={[styles.slider, styles.margin]}
        minimumValue={50}
        maximumValue={5000}
        minimumTrackTintColor={COLORS.MEDIUM_BLUE}
        maximumTrackTintColor={COLORS.GREY}
        value={3000}
        onValueChange={setMaxFrequency}
        step={1}
      /> */}

      <View style={[styles.center, styles.margin]}>
        <SoundPlayer mp3={require("../../audio/test.mp3")} />
      </View>

      <View style={[styles.row, styles.bottomButtons, styles.margin]}>
        <TouchableOpacity style={styles.button} onPress={onRecord}>
          <Text style={styles.body}>Record</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onImport}>
          <Text style={styles.body}>Import File</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

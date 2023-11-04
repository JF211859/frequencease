import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import SoundPlayer from "./TesterPlayer";
// import ProgressBar from "react-native-progress/Bar";
// import SemiCircleProgressBar from "react-progressbar-semicircle";
import styles from "../../Style/styles";
import { COLORS } from "../../Style/colorScheme";
import TutorialButton from "../ImageComponents/TutorialButton";
import {
  saveName,
  saveLowestFreq,
  saveHighestFreq,
  readData,
  MINFREQ_KEY,
  MAXFREQ_KEY,
} from "../Storage";

// This is the main view for the Frequency Tester
// First time users should be directed to this view first
// <SemiCircleProgressBar percentage={33} showPercentValue />
// <Progress.Bar progress={0.1} width={200} />
export default function FrequencyTester({ route }) {
  const navigation = useNavigation();
  const windowHeight = useWindowDimensions().height;

  const phase = route.params.phase || 1;

  // TODO: change this to a dynamic number
  // TODO: change audio sweep files to 3 discrete sounds per phase
  const phaseInfo = {
    1: { hz: 20, audio: require("../../audio/phase1sweep.mp3") },
    2: { hz: 200, audio: require("../../audio/phase2sweep.mp3") },
    3: { hz: 2500, audio: require("../../audio/phase3sweep.mp3") },
  };
  const navigateToTesterPhase = (phaseNum) => {
    if (phase < 3) {
      navigation.navigate("FrequencyTester", { phase: phaseNum + 1 });
    } else {
      navigation.navigate("FrequencyTesterPhase");
    }
  };

  return (
    <View style={{ height: { windowHeight }, flex: 1 }}>
      <Text style={[styles.h1, styles.center]}>Phase {phase}</Text>
      <View
        style={[
          styles.center,
          {
            alignSelf: "center",
            width: 230,
            height: 230,
            borderRadius: 115,
            borderColor: COLORS.GREY,
            borderWidth: 5,
            marginTop: 50,
          },
        ]}
      >
        <Text style={{ fontSize: 52, marginTop: 80 }}>
          {phaseInfo[phase].hz} Hz
        </Text>
      </View>

      <View style={[styles.center, styles.margin]}>
        <SoundPlayer mp3={phaseInfo[phase].audio} />
      </View>

      <Text style={[styles.h1, styles.center]}>Can you hear this sound?</Text>

      <View
        style={[styles.row, styles.margin, { justifyContent: "space-evenly" }]}
      >
        <TouchableOpacity
          onPress={() => {
            saveLowestFreq("20"); // TODO: dynamic value
            navigateToTesterPhase(phase);
          }}
        >
          <Image
            source={require("../../images/thumbsup.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigateToTesterPhase(phase);
          }}
        >
          <Image
            source={require("../../images/thumbsdown.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <TutorialButton />
    </View>
  );
}

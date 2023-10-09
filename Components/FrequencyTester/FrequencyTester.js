import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from "react-native";
import SoundPlayer from "../TesterPlayer";
// import ProgressBar from "react-native-progress/Bar";
// import SemiCircleProgressBar from "react-progressbar-semicircle";
import styles from "../../Style/styles";
import { COLORS } from "../../Style/colorScheme";
import TutorialButton from "../ImageComponents/TutorialButton";

// This is the main view for the Frequency Tester
// First time users should be directed to this view first
// <SemiCircleProgressBar percentage={33} showPercentValue />
// <Progress.Bar progress={0.1} width={200} />
export default function FrequencyTester({ route }) {
  const navigation = useNavigation();
  const windowHeight = useWindowDimensions().height;

  // const phase = {
  //   1: FrequenctTester(1),
  //   2: FrequenctTester(1),
  //   3: FrequenctTester(1),
  // };
  const phase = route.params.phase || 1;
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
        <Text style={{ fontSize: 52, marginTop: 80 }}>{phase} Hz</Text>
      </View>

      <View style={[styles.center, styles.margin]}>
        <SoundPlayer mp3={require("../../audio/audiosweep.mp3")} />
        {/* require needs to be different for each phase */}
      </View>

      <Text style={[styles.h1, styles.center]}>Can you hear this sound?</Text>

      <View
        style={[styles.row, styles.margin, { justifyContent: "space-evenly" }]}
      >
        <TouchableOpacity
          onPress={() => {
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

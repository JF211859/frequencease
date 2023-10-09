import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import SoundPlayer from "./audioPlayer";
import TutorialButton from "./ImageComponents/TutorialButton";
// import ProgressBar from "react-native-progress/Bar";
// import SemiCircleProgressBar from "react-progressbar-semicircle";

const windowWidth = Dimensions.get("window").width;

// This is the main view for the Frequency Tester
// First time users should be directed to this view first
// <SemiCircleProgressBar percentage={33} showPercentValue />
// <Progress.Bar progress={0.1} width={200} />
export default function FrequencyTester() {
  const circlePosition = windowWidth / 2 - 115;
  const thumbsUpPostion = windowWidth / 2 - 100;
  const thumbsDownPosition = 90;
  const navigation = useNavigation();

  const audio = () => {
    Alert.alert(
      "implement audio playback and button switching (play/pause) for alpha"
    );
  };

  return (
    <View>
      <View
        style={{
          width: 230,
          height: 230,
          borderRadius: 115,
          borderColor: "grey",
          borderWidth: 5,
          marginLeft: circlePosition,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            fontSize: 52,
            marginTop: 80,
            textAlign: "center",
            color: "black",
          }}
        >
          20 Hz
        </Text>
      </View>

      <SoundPlayer mp3={require("../audio/audiosweep.mp3")} />

      <Text style={{ fontSize: 32, marginTop: 100, textAlign: "center" }}>
        Can you hear this sound?
      </Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FrequencyTesterPhase")}
        >
          <Image
            source={require("../images/thumbsup.png")}
            style={{
              width: 55,
              height: 55,
              marginTop: 40,
              marginLeft: thumbsUpPostion,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("FrequencyTesterPhase")}
        >
          <Image
            source={require("../images/thumbsdown.png")}
            style={{
              width: 55,
              height: 55,
              marginTop: 40,
              marginLeft: thumbsDownPosition,
            }}
          />
        </TouchableOpacity>
      </View>

      <TutorialButton />
    </View>
  );
}

const styles = StyleSheet.create({});

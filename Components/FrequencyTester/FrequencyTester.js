import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  Button,
} from "react-native";
import SoundPlayer from "./TesterPlayer";
import TutorialButton from "../ImageComponents/TutorialButton";
import StepIndicator from "react-native-step-indicator";
import CircularProgress, {
  ProgressRef,
} from "react-native-circular-progress-indicator";
import { Audio } from "expo-av";

import {
  saveName,
  saveLowestFreq,
  saveHighestFreq,
  readData,
  MINFREQ_KEY,
  MAXFREQ_KEY,
} from "../Storage";
import styles from "../../Style/styles";
import { COLORS } from "../../Style/colorScheme";
import Modal from "react-native-modal";

export default function FrequencyTester({ route }) {
  const navigation = useNavigation();
  const windowHeight = useWindowDimensions().height;

  const phase = route.params.phase || 1;

  // TODO: change this to a dynamic number
  // TODO: change audio sweep files to 3 discrete sounds per phase
  const phaseInfo = {
    1: { hz: 20, audio: require("../../audio/500.mp3") },
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
  // progress bar
  const labels = ["Phase 1", "Phase 2", "Phase 3"];
  const progressRef = React.useRef(null);

  // modal
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [ringtonePlayed, setRingtonePlayed] = React.useState(false);
  React.useEffect(() => {
    if (phase === 1) {
      setModalVisible(true);
    }
  }, []);
  const playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require("../../audio/ringtone.mp3"));
      await soundObject.playAsync();
      soundObject.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setRingtonePlayed(true);
        }
      });
    } catch (error) {
      console.error("Error loading sound", error);
    }
  };

  return (
    <View style={{ height: { windowHeight }, flex: 1 }}>
      {/* Modal to notify users to turn on ringer */}
      <Modal
        isVisible={isModalVisible}
        style={styles.center}
        backdropOpacity={0.8}
      >
        <View
          style={[
            styles.center,
            {
              width: 300,
              height: 310,
              backgroundColor: "white",
              borderRadius: 30,
              padding: 20,
            },
          ]}
        >
          <Text style={[styles.h2, { paddingBottom: 20 }]}>
            Please turn on your device's ringer before starting the test. 😃
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              {
                width: 220,
                marginBottom: 15,
                borderRadius: 30,
                backgroundColor: COLORS.LIGHT_BLUE,
              },
            ]}
            onPress={playSound}
          >
            <Text style={[styles.h2, { marginTop: 0 }]}>Play Test Audio</Text>
          </TouchableOpacity>
          {ringtonePlayed && (
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderRadius: 30,
                  backgroundColor: COLORS.GREEN,
                },
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.h3}>Okay, I'm ready!</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>

      {/* FrequencyTester View */}
      <StepIndicator
        currentPosition={phase - 1}
        labels={labels}
        stepCount={3}
        customStyles={{
          labelSize: 25,
          currentStepLabelColor: COLORS.BLACK,
          labelColor: COLORS.GREY,
          stepIndicatorSize: 30,
          currentStepIndicatorSize: 35,
          stepStrokeCurrentColor: COLORS.DARK_BLUE,
          stepStrokeFinishedColor: COLORS.MEDIUM_BLUE,
          stepStrokeUnFinishedColor: COLORS.MEDIUM_BLUE,
          separatorFinishedColor: COLORS.MEDIUM_BLUE,
          separatorUnFinishedColor: COLORS.GREY,
          stepIndicatorFinishedColor: COLORS.MEDIUM_BLUE,
          stepIndicatorUnFinishedColor: COLORS.GREY,
          stepIndicatorCurrentColor: COLORS.MEDIUM_BLUE,
          stepIndicatorLabelCurrentColor: COLORS.MEDIUM_BLUE,
          stepIndicatorLabelFinishedColor: COLORS.MEDIUM_BLUE,
          stepIndicatorLabelUnFinishedColor: COLORS.GREY,
        }}
      />

      <View style={[styles.center, { marginTop: 30 }]}>
        <CircularProgress
          radius={130}
          progressValueFontSize={60}
          ref={progressRef}
          value={25000}
          title={"Hz"}
          titleStyle={{ fontWeight: "bold" }}
          duration={400}
        />
      </View>

      {/* <View
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
      </View> */}

      <View style={[styles.center, styles.margin]}>
        <SoundPlayer mp3={phaseInfo[phase].audio} progressRef={progressRef} />
      </View>

      <Text style={[styles.h1, styles.center, { marginBottom: 20 }]}>
        Can you hear this sound?
      </Text>

      <View
        style={[styles.row, styles.margin, { justifyContent: "space-evenly" }]}
      >
        <TouchableOpacity
          onPress={() => {
            navigateToTesterPhase(phase);
          }}
        >
          <Image
            source={require("../../images/thumbsdown.png")}
            style={styles.icon}
          />
          <Text style={[styles.h3, { marginLeft: 12, marginTop: 5 }]}>No</Text>
        </TouchableOpacity>
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
          <Text style={[styles.h3, { marginLeft: 12, marginTop: 5 }]}>Yes</Text>
        </TouchableOpacity>
      </View>

      <TutorialButton />
    </View>
  );
}

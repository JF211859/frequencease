import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import SoundPlayer from "./TesterPlayer";
import TutorialButton from "../ImageComponents/TutorialButton";
import StepIndicator from "react-native-step-indicator";
import CircularProgress from "react-native-circular-progress-indicator";
import { Audio } from "expo-av";

import { saveLowestFreq, saveHighestFreq } from "../Storage";
import styles from "../../Style/styles";
import { COLORS } from "../../Style/colorScheme";
import Modal from "react-native-modal";

export default function FrequencyTester({ route }) {
  const navigation = useNavigation();
  const windowHeight = useWindowDimensions().height;

  const phase = route.params.phase || 0;
  const actualPhase = parseInt(phase / 3, 10) + 1;

  const phaseInfo = {
    0: { hz: 500, audio: require("../../audio/500.mp3") }, //phase 1
    1: { hz: 1000, audio: require("../../audio/1000.mp3") },
    2: { hz: 2000, audio: require("../../audio/2000.mp3") },

    3: { hz: 4000, audio: require("../../audio/4000.mp3") }, //phase 2
    4: { hz: 6000, audio: require("../../audio/6000.mp3") },
    5: { hz: 8000, audio: require("../../audio/8000.mp3") },

    6: { hz: 10000, audio: require("../../audio/10000.mp3") }, //phase 3
    7: { hz: 12000, audio: require("../../audio/12000.mp3") },
    8: { hz: 14000, audio: require("../../audio/14000.mp3") },
  };

  const navigateToNextPhase = () => {
    if (phase === 8) {
      navigation.navigate("FrequencyTesterPhase"); //final phase finished
    } else {
      navigation.navigate("FrequencyTester", {
        phase: phase + 1,
      });
    }
  };

  // progress bar
  const labels = ["Phase 1", "Phase 2", "Phase 3"];
  const progressRef = React.useRef(null);

  // ringtone modal
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [ringtonePlayed, setRingtonePlayed] = React.useState(false);
  React.useEffect(() => {
    if (phase === 0) {
      setModalVisible(true);
    }
  }, []);
  const playRingtone = async () => {
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

  // tutorial page
  const testerTutorialPage = () => {
    Alert.alert("tutorial page to be implemented");
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
              height: 300,
              backgroundColor: "white",
              borderRadius: 30,
              padding: 20,
            },
          ]}
        >
          <Text style={[styles.h2, { paddingBottom: 20, marginTop: 20 }]}>
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
            onPress={playRingtone}
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
        currentPosition={actualPhase - 1}
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
          ref={progressRef}
          initialValue={100}
          progressValueColor={"#f2f2f2"}
          value={0}
          duration={4000} //4 seconds
          radius={130}
          progressValueFontSize={0.5}
          titleFontSize={55}
          title={`${phaseInfo[phase].hz}`}
          titleStyle={{
            fontWeight: "bold",
            color: COLORS.BLACK,
            marginTop: 20,
          }}
          subtitle={"Hz"}
          subtitleStyle={{
            fontWeight: "bold",
            fontSize: 40,
            marginTop: 0,
            color: COLORS.BLACK,
          }}
        />
      </View>

      <View style={[styles.center, styles.margin]}>
        <SoundPlayer mp3={phaseInfo[phase].audio} progressRef={progressRef} />
      </View>

      <Text style={[styles.h1, styles.marginTop, styles.center]}>
        Can you hear this sound?
      </Text>

      <View
        style={[styles.row, styles.margin, { justifyContent: "space-evenly" }]}
      >
        <TouchableOpacity
          onPress={() => {
            if (actualPhase === 1) {
              saveLowestFreq(phaseInfo[phase + 1].hz.toString());
              navigateToNextPhase();
            } else {
              saveHighestFreq(phaseInfo[phase - 1].hz.toString());
              navigation.navigate("FrequencyTesterPhase"); //finish hearing test
            }
          }}
        >
          <Image
            source={require("../../images/thumbsdown.png")}
            style={styles.icon}
          />
          <Text style={[styles.h3, { marginLeft: 12, marginTop: 8 }]}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (actualPhase !== 1) {
              saveHighestFreq(phaseInfo[phase].hz.toString());
            }
            navigateToNextPhase();
          }}
        >
          <Image
            source={require("../../images/thumbsup.png")}
            style={styles.icon}
          />
          <Text style={[styles.h3, { marginLeft: 12, marginTop: 8 }]}>Yes</Text>
        </TouchableOpacity>
      </View>

      <TutorialButton tutorial={() => testerTutorialPage()} />
    </View>
  );
}

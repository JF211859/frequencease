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
import TutorialButton from "../ImageComponents/TutorialButton";
import StepIndicator from "react-native-step-indicator";
import CircularProgress from "react-native-circular-progress-indicator";
import { saveLowestFreq, saveHighestFreq } from "../Storage";
import styles from "../../Style/styles";
import { COLORS } from "../../Style/colorScheme";
import TesterModal from "./TesterModal";
import TesterTutorialModal from "./TesterTutorialModal";
import { phaseInfo } from "./testerData";

export default function FrequencyTester({ route }) {
  const navigation = useNavigation();
  const windowHeight = useWindowDimensions().height;

  const phase = route.params.phase || 0;
  const actualPhase = parseInt(phase / 3, 10) + 1;

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
  const progressRef = React.useRef(null);
  const labels = ["Phase 1", "Phase 2", "Phase 3"];

  //  handle test sound played state
  const [soundPlayed, setSoundPlayed] = React.useState(false);
  function handleSound(isSoundPlayed) {
    setSoundPlayed(isSoundPlayed);
  }

  // tester tutorial
  const [tutorialVisible, setTutorialVisible] = React.useState(false);
  const openTutorial = () => {
    setTutorialVisible(true);
  };
  const closeTutorial = () => {
    setTutorialVisible(false);
  };

  return (
    <View style={{ height: { windowHeight }, flex: 1 }}>
      {/* Tester Modals */}
      <TesterModal phase={phase} />
      <TesterTutorialModal
        showModal={tutorialVisible}
        onClose={closeTutorial}
      />

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
        <SoundPlayer
          mp3={phaseInfo[phase].audio}
          progressRef={progressRef}
          soundPlayed={handleSound}
        />
      </View>

      <Text style={[styles.h1, styles.marginTop, styles.center]}>
        Can you hear this sound?
      </Text>

      {/* display thumbs up/down after the sound plays */}
      {soundPlayed && (
        <View
          style={[
            styles.row,
            styles.margin,
            { justifyContent: "space-evenly" },
          ]}
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
            <Text style={[styles.h3, { marginLeft: 12, marginTop: 8 }]}>
              No
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (phase === 0) {
                saveLowestFreq("100");
              }
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
            <Text style={[styles.h3, { marginLeft: 12, marginTop: 8 }]}>
              Yes
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TutorialButton tutorial={() => openTutorial()} />
    </View>
  );
}

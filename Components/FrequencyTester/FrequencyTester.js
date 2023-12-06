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
import dynamicStyles from "../../Style/styles";
import TesterModal from "./TesterModal";
import TesterTutorialModal from "./TesterTutorialModal";
import { phaseInfo } from "./testerData";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../../Style/ThemeContext";

export default function FrequencyTester({ route }) {
  const styles = dynamicStyles();

  const navigation = useNavigation();
  const windowHeight = useWindowDimensions().height;
  const { getIsDarkMode, getAppTheme } = useTheme();
  const appTheme = getAppTheme();

  const phase = route.params.phase || 0;
  const actualPhase = parseInt(phase / 3, 10) + 1;

  const navigateToNextPhase = () => {
    if (phase === 8) {
      navigation.navigate("FrequencyTesterPhase"); //final phase finished
      saveHighestFreq("8000");
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

  // tester tutorial modal
  const [tutorialVisible, setTutorialVisible] = React.useState(false);
  const toggleTutorial = (isVisible) => {
    setTutorialVisible(isVisible);
  };

  // keep track of yes/no state
  const [answeredYes, setAnsweredYes] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setAnsweredYes(false);
    }, [])
  );

  if (phase === 0) {
    saveLowestFreq("100");
    saveHighestFreq("100");
  }

  return (
    <View style={{ height: { windowHeight }, flex: 1 }}>
      {/* Tester Modals */}
      <TesterModal phase={phase} />
      <TesterTutorialModal
        isVisible={tutorialVisible}
        toggleTutorial={toggleTutorial}
      />

      {/* FrequencyTester View */}
      <StepIndicator
        currentPosition={actualPhase - 1}
        labels={labels}
        stepCount={3}
        customStyles={{
          labelSize: 25,
          currentStepLabelColor: appTheme.TEXT_STANDARD,
          labelColor: appTheme.TEXT_SECONDARY,
          stepIndicatorSize: 30,
          currentStepIndicatorSize: 35,
          stepStrokeCurrentColor: appTheme.BLUE_DARK,
          stepStrokeFinishedColor: appTheme.BLUE_MED,
          stepStrokeUnFinishedColor: appTheme.BLUE_MED,
          separatorFinishedColor: appTheme.BLUE_MED,
          separatorUnFinishedColor: appTheme.TEXT_SECONDARY,
          stepIndicatorFinishedColor: appTheme.BLUE_MED,
          stepIndicatorUnFinishedColor: appTheme.TEXT_SECONDARY,
          stepIndicatorCurrentColor: appTheme.BLUE_MED,
          stepIndicatorLabelCurrentColor: appTheme.BLUE_MED,
          stepIndicatorLabelFinishedColor: appTheme.BLUE_MED,
          stepIndicatorLabelUnFinishedColor: appTheme.TEXT_SECONDARY,
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
            color: appTheme.TEXT_STANDARD,
            marginTop: 20,
          }}
          subtitle={"Hz"}
          subtitleStyle={{
            fontWeight: "bold",
            fontSize: 40,
            marginTop: 0,
            color: appTheme.TEXT_STANDARD,
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

      <Text
        style={[
          styles.h1,
          styles.marginTop,
          styles.center,
          { color: appTheme.TEXT_STANDARD },
        ]}
      >
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
              // save highest frequency when user clicks "No" after hitting yes beforehand
              if (answeredYes) {
                saveHighestFreq(phaseInfo[phase - 1].hz.toString());
                navigation.navigate("FrequencyTesterPhase");
              } else {
                navigateToNextPhase();
              }
            }}
          >
            <Image
              source={require("../../images/thumbsdown.png")}
              style={styles.icon}
            />
            <Text
              style={[
                styles.h3,
                { marginLeft: 12, marginTop: 8, color: appTheme.TEXT_STANDARD },
              ]}
            >
              No
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Save the lowest frequency when the user hits "Yes" for the first time
              if (!answeredYes) {
                saveLowestFreq(phaseInfo[phase].hz.toString());
                setAnsweredYes(true);
              }
              navigateToNextPhase();
            }}
          >
            <Image
              source={require("../../images/thumbsup.png")}
              style={styles.icon}
            />
            <Text
              style={[
                styles.h3,
                { marginLeft: 12, marginTop: 8, color: appTheme.TEXT_STANDARD },
              ]}
            >
              Yes
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TutorialButton tutorial={() => toggleTutorial(!tutorialVisible)} />
    </View>
  );
}

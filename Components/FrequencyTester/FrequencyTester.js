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
import { useFocusEffect } from "@react-navigation/native";

export default function FrequencyTester({ route }) {
  const navigation = useNavigation();
  const windowHeight = useWindowDimensions().height;

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
  const [answeredNo, setAnsweredNo] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setAnsweredYes(false);
      setAnsweredNo(false);
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

      {/* Tutorial Modal */}
      <Modal
        isVisible={isTutorialModalVisible}
        style={styles.center}
        backdropOpacity={0.8}
      >
        <View
          style={[
            styles.center,
            {
              width: 300,
              height: 350,
              backgroundColor: "white",
              borderRadius: 30,
              padding: 20,
            },
          ]}
        >
          <Text
            style={[
              styles.h3,
              { paddingBottom: 20, marginTop: 20, fontWeight: "bold" },
            ]}
          >
            Tutorial
          </Text>
          <Text style={styles.body}>
            Press the play button to listen to the current sound. If you can
            hear the sound, select the thumbs up button ("Yes") on the right.
            If you can't hear the sound, select the thumbs down ("No") button
            on the left.
          </Text>

          <View style={[styles.row, { justifyContent: "space-around" }]}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderRadius: 30,
                  backgroundColor: COLORS.RED,
                  marginRight: 10,
                  marginTop: 20,
                },
              ]}
              onPress={() => closeTutorial()}
            >
              <Text style={styles.h3}>Close</Text>
            </TouchableOpacity>
          </View>
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
            <Text style={[styles.h3, { marginLeft: 12, marginTop: 8 }]}>
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
            <Text style={[styles.h3, { marginLeft: 12, marginTop: 8 }]}>
              Yes
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TutorialButton tutorial={() => toggleTutorial(!tutorialVisible)} />
    </View>
  );
}

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import { APP_THEME } from "../../Style/colorScheme";
import TutorialButton from "../ImageComponents/TutorialButton";
import styles from "../../Style/styles";
import { readData, MINFREQ_KEY, MAXFREQ_KEY } from "../Storage";
import TesterResultsModal from "./TesterResultsModal";
import { phaseInfo } from "./testerData";

function ResultsDisplay({ minFreq, maxFreq }) {
  const phases = [[], [], []]; //logic for setting the range information
  for (let i = 0; i < 9; i++) {
    const { hz } = phaseInfo[i];
    if (hz >= minFreq && hz <= maxFreq) {
      const phaseIndex = parseInt(i / 3, 10);
      phases[phaseIndex].push(hz);
    }
  }

  return phases.map((phase, index) => (
    <View style={styles.phaseContainer} key={index}>
      <View style={{ paddingRight: 20 }}>
        <Text
          style={[
            styles.h3,
            styles.center,
            {
              fontWeight: "bold",
              color: APP_THEME.TEXT_STANDARD,
            },
          ]}
        >
          {`Phase ${index + 1}:`}
        </Text>
        <Text style={[styles.h3, styles.center, { fontStyle: "italic" }]}>
          {index === 0 ? "lower" : index === 1 ? "middle" : "upper"} range
        </Text>
      </View>
      {phase.length > 0 ? (
        <Text style={styles.h3}>{`${Math.min(...phase)}Hz - ${Math.max(
          ...phase
        )}Hz`}</Text>
      ) : (
        <Text style={styles.h3}>Out of Range</Text>
      )}
    </View>
  ));
}

export default function FrequencyTesterPhase() {
  const navigation = useNavigation();
  const [minFreq, setMinFreq] = React.useState(400); //default hearing range
  const [maxFreq, setMaxFreq] = React.useState(800);

  React.useEffect(() => {
    readData(MINFREQ_KEY).then((minFreqValue) => setMinFreq(minFreqValue));
    readData(MAXFREQ_KEY).then((maxFreqValue) => setMaxFreq(maxFreqValue));
  }, []);

  // tutorial modal
  const [tutorialVisible, setTutorialVisible] = React.useState(false);
  const toggleTutorial = (isVisible) => {
    setTutorialVisible(isVisible);
  };

  return (
    <View style={[styles.screenContainer, { gap: 5 }]}>
      <TesterResultsModal
        isVisible={tutorialVisible}
        toggleTutorial={toggleTutorial}
      />

      <Text style={[styles.h1, styles.center, { fontWeight: "bold" }]}>
        Your test results are in! 🎉{" "}
      </Text>

      <Text style={[styles.h2, styles.center, { marginBottom: 20 }]}>
        Your hearing range is {minFreq} - {maxFreq}Hz
      </Text>

      <ResultsDisplay minFreq={minFreq} maxFreq={maxFreq} />

      <View style={[styles.bottomButtons, { marginTop: 20 }]}>
        <TouchableOpacity
          style={[
            styles.button,
            { borderRadius: 15, backgroundColor: APP_THEME.CANCEL },
          ]}
          onPress={() => {
            navigation.navigate({
              name: "FrequencyTester",
              params: { phase: 0 },
            });
          }}
        >
          <Text style={styles.h3}>Retake Entire Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { borderRadius: 15, backgroundColor: APP_THEME.CONFIRM },
          ]}
          onPress={() => {
            navigation.dispatch(StackActions.popToTop());
            navigation.dispatch(StackActions.push("Profile"));
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.h3}>Go to Adjuster</Text>
        </TouchableOpacity>
      </View>
      <TutorialButton tutorial={() => toggleTutorial(!tutorialVisible)} />
    </View>
  );
}

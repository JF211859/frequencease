import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import { APP_THEME } from "../../Style/colorScheme";
import TutorialButton from "../ImageComponents/TutorialButton";
import styles from "../../Style/styles";
import { readData, MINFREQ_KEY, MAXFREQ_KEY } from "../Storage";

function Phase(props) {
  const phaseColor = APP_THEME[`PHASE_${props.phase}`];
  const navigation = useNavigation();
  const phaseNum = (props.phase - 1) * 3;

  return (
    <View style={styles.phaseContainer}>
      <View>
        <Text
          style={[
            styles.h3,
            styles.center,
            { fontWeight: "bold", color: APP_THEME.TEXT_STANDARD },
          ]}
        >
          Phase {props.phase}
        </Text>
        <Text style={[styles.h3, styles.center, { fontStyle: "italic" }]}>
          {props.phase === 1 ? "lower" : props.phase === 2 ? "middle" : "upper"}{" "}
          range
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { borderRadius: 15, backgroundColor: phaseColor },
        ]}
        onPress={() => {
          navigation.navigate({
            name: "FrequencyTester",
            params: { phase: phaseNum },
          });
        }}
      >
        <Text style={styles.body}>Retake</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function FrequencyTesterPhase() {
  const navigation = useNavigation();
  const [minFreq, setMinFreq] = React.useState(400); //default hearing range
  const [maxFreq, setMaxFreq] = React.useState(800);

  React.useEffect(() => {
    readData(MINFREQ_KEY).then((minFreqValue) => setMinFreq(minFreqValue));
    readData(MAXFREQ_KEY).then((maxFreqValue) => setMaxFreq(maxFreqValue));
  }, []);

  return (
    <View style={[styles.screenContainer, { gap: 5 }]}>
      <Text style={[styles.h1, styles.center, { fontWeight: "bold" }]}>
        Your test results are in! 🎉{" "}
      </Text>

      <Text style={[styles.h2, styles.center, { marginBottom: 20 }]}>
        Your hearing range is {minFreq} - {maxFreq}Hz
      </Text>
      <Phase phase={1} />
      <Phase phase={2} />
      <Phase phase={3} />

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

      <TutorialButton />
    </View>
  );
}

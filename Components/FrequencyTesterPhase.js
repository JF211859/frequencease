import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { APP_THEME, COLORS } from "../Style/colorScheme";
import TutorialButton from "./ImageComponents/TutorialButton";
import styles from '../Style/styles';

function Phase(props) {
  const phaseColor = APP_THEME[`PHASE_${props.phase}`];
  const navigation = useNavigation();

  return (
    <View style={styles.phaseContainer}>
      <View>
        <Text
          color={APP_THEME.TEXT_STANDARD}
          style={[styles.h3, styles.center, { fontWeight: "bold" }]}
        >
          Phase {props.phase}
        </Text>
        <Text style={[styles.h3, styles.center, { fontStyle: "italic" }]}>
          {props.progress}%
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: phaseColor }]}
        onPress={() => {
          navigation.navigate("FrequencyTester"); //TODO: need to change
        }}
      >
        <Text style={styles.body}>Retake</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function FrequencyTesterPhase(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.screenContainer}>
      {/* TODO: insert progress bar */}
      <Text style={[styles.h1, styles.center, {fontWeight: 'bold'}]}>
        Test Completed!
      </Text>
      <Text style={[styles.h2, styles.center]}>**insert progress bar**</Text>
      <Phase phase={1} progress={100} />
      <Phase phase={2} progress={100} />
      <Phase phase={3} progress={80} />

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: APP_THEME.CANCEL }]}
          onPress={() => {
            navigation.navigate("FrequencyTester"); //TODO: need to change
          }}
        >
        <Text style={styles.body}>Retake Entire Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: APP_THEME.CONFIRM }]}
          onPress={() => {
            navigation.navigate("FrequencyTester"); //TODO: need to change
          }}
        >
          <Text style={styles.body}>Confirm Results</Text>
        </TouchableOpacity>
      </View>

      <TutorialButton />
    </View>
  );
}

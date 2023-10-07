import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { APP_THEME, COLORS } from "../Style/colorScheme";
import TutorialButton from "./ImageComponents/TutorialButton";

function Phase(props) {
  const phaseColor = APP_THEME[`PHASE_${props.phase}`];
  const navigation = useNavigation();

  return (
    <View style={styles.phaseContainer}>
      <View>
        <Text
          color={APP_THEME.TEXT_STANDARD}
          style={[styles.phaseText, { fontWeight: "bold" }]}
        >
          Phase {props.phase}
        </Text>
        <Text style={[styles.phaseText, { fontStyle: "italic" }]}>
          {props.progress}%
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: phaseColor }]}
        onPress={() => {
          navigation.navigate("FrequencyTester"); //TODO: need to change
        }}
      >
        <Text style={styles.phaseText}>Retake</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function FrequencyTesterPhase(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.screenContainer}>
      {/* TODO: insert progress bar */}
      <Text style={[styles.phaseText, { fontSize: 35, fontWeight: "bold" }]}>
        Test Completed!
      </Text>
      <Text style={styles.phaseText}>**insert progress bar**</Text>
      <Phase phase={1} progress={100} />
      <Phase phase={2} progress={100} />
      <Phase phase={3} progress={80} />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: APP_THEME.CANCEL }]}
          onPress={() => {
            navigation.navigate("FrequencyTester"); //TODO: need to change
          }}
        >
          <Text style={{ fontSize: 20 }}>Retake Entire Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: APP_THEME.CONFIRM }]}
          onPress={() => {
            navigation.navigate("FrequencyTester"); //TODO: need to change
          }}
        >
          <Text style={{ fontSize: 20 }}>Confirm Results</Text>
        </TouchableOpacity>
      </View>
      <TutorialButton />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
  },
  phaseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 80,
    marginVertical: 30,
  },
  phaseText: {
    fontSize: 25,
    textAlign: "center",
  },
  buttons: {
    padding: 10,
    borderRadius: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
});

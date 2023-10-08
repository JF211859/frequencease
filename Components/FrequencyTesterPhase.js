import { View, StyleSheet, Text, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { APP_THEME, COLORS } from "../Style/colorScheme";
import styles from '../Style/styles.js';

function Phase(props) {
  return (
    <View>
      <Text color={APP_THEME.TEXT_STANDARD}>Phase {props.phase}</Text>
      <Button
        color={APP_THEME.PHASE_1}
        onPress={() => {
          Alert.alert("retake");
        }}
        title="Retake"
      />
    </View>
  );
}

export default function FrequencyTesterPhase(props) {
  const navigation = useNavigation();

  return (
    <View>
      {/* progress bar */}
      {/* phases */}
      <TouchableOpacity
        style={[styles.button, {color: APP_THEME.CONFIRM}]}
        onPress={() => {
          navigation.navigate("FrequencyTester"); //TODO: need to change
        }}>
        <Text>Retake Entire Test</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {color: APP_THEME.CANCEL}]}
        onPress={() => {
          navigation.navigate("FrequencyAdjuster"); //TODO: need to change
        }}>
        <Text>Confirm Results</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}>
        <Text>Help</Text>
      </TouchableOpacity>
    </View>
  );
}


// <Button title="Retake Entire Test" color={APP_THEME.CANCEL} />
// <Button title="Confirm Results" color={APP_THEME.CONFIRM} />
// <Button title="Help" color={APP_THEME.APP_BLUE} />


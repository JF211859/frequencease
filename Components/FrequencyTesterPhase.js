import { View, StyleSheet, Text, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { APP_THEME, COLORS } from "../Style/colorScheme";

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
      <Button title="Retake Entire Test" color={APP_THEME.CANCEL} />
      <Button title="Confirm Results" color={APP_THEME.CONFIRM} />
      <Button title="Help" color={APP_THEME.APP_BLUE} />
    </View>
  );
}

const styles = StyleSheet.create({});

import { View, Text, Button, Alert } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import styles from "../../Style/styles";

export default function FrequencyTesterConfirmation(props) {
  const navigation = useNavigation();

  return (
    <View style={[styles.screenContainer, { gap: 10 }]}>
      <Text style={[styles.h1, styles.center]}>
        Your test results are in! 🎉
      </Text>
      <Text style={[styles.h2, styles.center]}>
        Your hearing range is 20 - 20,000Hz
      </Text>

      <Button
        title="Go to Frequency Adjuster"
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());
          navigation.dispatch(StackActions.push("Profile")); //reset stack navigation
          navigation.navigate("Home");
        }}
      ></Button>
      <Button
        title="Retake Test"
        onPress={() => {
          navigation.navigate("FrequencyTester");
        }}
      ></Button>
    </View>
  );
}

import React from "react";
import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import styles from "../../Style/styles";
import { APP_THEME } from "../../Style/colorScheme";
import { readData, MINFREQ_KEY, MAXFREQ_KEY } from "../Storage";

export default function FrequencyTesterConfirmation() {
  const navigation = useNavigation();

  // get minFreq and maxFreq from asyncStorage
  const [minFreq, setMinFreq] = React.useState(null);
  const [maxFreq, setMaxFreq] = React.useState(null);

  React.useEffect(() => {
    readData(MINFREQ_KEY).then((minFreqValue) => setMinFreq(minFreqValue));
    readData(MAXFREQ_KEY).then((maxFreqValue) => setMaxFreq(maxFreqValue));
  }, []);

  return (
    <View style={[styles.screenContainer, { gap: 10 }]}>
      <Text style={[styles.h1, styles.center]}>
        Your test results are in! 🎉
      </Text>
      <Text style={[styles.h2, styles.center]}>
        Your hearing range is {minFreq} - {maxFreq}Hz
      </Text>

      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());
          navigation.dispatch(StackActions.push("Profile")); //reset stack navigation
          navigation.navigate("Home");
        }}
        style={{
          backgroundColor: APP_THEME.APP_BLUE,
          width: 300,
          height: 60,
          borderRadius: 50,
          marginTop: 20,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          Go to Frequency Adjuster
        </Text>
      </TouchableOpacity>
    </View>
  );
}

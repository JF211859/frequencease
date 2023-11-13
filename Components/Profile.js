import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Style/styles";
import { useNavigation } from "@react-navigation/native";
import { APP_THEME } from "../Style/colorScheme";
import { readData, MINFREQ_KEY, MAXFREQ_KEY } from "./Storage";

export default function Profile() {
  const navigation = useNavigation();

  // get minFreq and maxFreq from asyncStorage
  const [minFreq, setMinFreq] = React.useState(null);
  const [maxFreq, setMaxFreq] = React.useState(null);

  React.useEffect(() => {
    readData(MINFREQ_KEY).then((minFreqValue) => setMinFreq(minFreqValue));
    readData(MAXFREQ_KEY).then((maxFreqValue) => setMaxFreq(maxFreqValue));
  }, []);

  return (
    <View style={[styles.screenContainer, styles.center, { margin: 20 }]}>
      <Text style={[styles.h1, { marginBottom: 20 }]}>
        Your Hearing Range is:
      </Text>
      <View style={[styles.row]}>
        <Text style={styles.h2}>{minFreq} Hz - </Text>
        <Text style={styles.h2}>{maxFreq} Hz</Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: APP_THEME.APP_BLUE,
          width: 250,
          height: 50,
          borderRadius: 50,
          marginTop: 30,
          alignSelf: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          navigation.navigate({
            name: "FrequencyTester",
            params: { phase: 1 },
          });
        }}
      >
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          Retake Frequency Test
        </Text>
      </TouchableOpacity>
    </View>
  );
}

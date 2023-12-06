import React from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import dynamicStyles from "../Style/styles";
import { useNavigation } from "@react-navigation/native";
import { readData, MINFREQ_KEY, MAXFREQ_KEY } from "./Storage";
import { useTheme } from "../Style/ThemeContext";

export default function Profile() {
  const styles = dynamicStyles();

  const navigation = useNavigation();
  const { isDarkMode, toggleTheme, getAppTheme } = useTheme();

  // get minFreq and maxFreq from asyncStorage
  const [minFreq, setMinFreq] = React.useState(400);
  const [maxFreq, setMaxFreq] = React.useState(800);

  React.useEffect(() => {
    readData(MINFREQ_KEY).then((minFreqValue) => setMinFreq(minFreqValue));
    readData(MAXFREQ_KEY).then((maxFreqValue) => setMaxFreq(maxFreqValue));
  }, []);

  const appTheme = getAppTheme();

  return (
    <View style={[styles.screenContainer, styles.center, { margin: 20 }]}>
      <Text
        style={[styles.h1, { marginBottom: 20, color: appTheme.TEXT_STANDARD }]}
      >
        Your Hearing Range is:
      </Text>
      <View style={[styles.row]}>
        <Text style={[styles.h2, { color: appTheme.TEXT_STANDARD }]}>
          {minFreq} Hz -{" "}
        </Text>
        <Text style={[styles.h2, { color: appTheme.TEXT_STANDARD }]}>
          {maxFreq} Hz
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: appTheme.APP_BLUE,
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
            params: { phase: 0 },
          });
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: appTheme.TEXT_STANDARD,
          }}
        >
          Retake Frequency Test
        </Text>
      </TouchableOpacity>
      {/* Toggle for Dark/Light Mode */}
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <Text
          style={[
            styles.h2,
            {
              marginBottom: 10,
              color: appTheme.TEXT_STANDARD,
            },
          ]}
        >
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          ios_backgroundColor={"#3e3e3e"}
        />
      </View>
    </View>
  );
}

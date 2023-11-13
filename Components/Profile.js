import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Style/styles";
import { useNavigation } from "@react-navigation/native";
import { APP_THEME } from "../Style/colorScheme";
export default function Profile() {
  const navigation = useNavigation();

  return (
    <View style={[styles.screenContainer, styles.center, { margin: 20 }]}>
      <Text style={styles.h1}>Your Hearing Range is:</Text>
      <View style={[styles.row]}>
        <Text style={styles.h2}>20 Hz - </Text>
        <Text style={styles.h2}>20000 Hz</Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: APP_THEME.APP_BLUE,
          width: 250,
          height: 50,
          borderRadius: 50,
          marginTop: 40,
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

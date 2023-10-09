import React from "react";
import { View, Text } from "react-native";
import styles from "../Style/styles";

export default function Settings() {
  return (
    <View style={[styles.screenContainer, { margin: 20 }]}>
      <Text style={styles.h2}>Input Device</Text>
      <Text style={styles.h2}>Output Device</Text>
      <Text style={styles.h2}>Tutorial</Text>
    </View>
  );
}

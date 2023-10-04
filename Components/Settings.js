import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Settings() {
  return (
    <View>
      <Text style={styles.option}>Input Device</Text>
      <Text style={styles.option}>Output Device</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  option: { fontSize: 20 },
});

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Button } from "react-native";

// This is the main view for the Frequency Tester
// First time users should be directed to this view first
export default function FrequencyTester() {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        onPress={() => navigation.navigate("FrequencyTesterPhase")}
        title="Go to Phase View"
      />
    </View>
  );
}

const styles = StyleSheet.create({});

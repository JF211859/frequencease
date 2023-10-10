import React from "react";
import { Image, TouchableOpacity, Alert } from "react-native";
import styles from '../../Style/styles';

// Tutorial button
export default function TutorialButton() {
  const testerTutorialPage = () => {
    Alert.alert("tutorial page to be implemented");
  };

  return (
    <TouchableOpacity onPress={testerTutorialPage} style={[styles.circleButton, styles.corner]}>
      <Image
        source={require("../../images/tutorial.png")}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

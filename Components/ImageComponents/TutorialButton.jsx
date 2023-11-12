import React from "react";
import { Image, TouchableOpacity, Alert } from "react-native";
import styles from '../../Style/styles';

const TutorialButton = ({
  tutorial
}) => {
  return (
    <TouchableOpacity onPress={tutorial} style={[styles.circleButton, styles.corner]}>
      <Image
        source={require("../../images/tutorial.png")}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}
export default TutorialButton;
import React from "react";
import { Image, TouchableOpacity, Dimensions, Alert } from "react-native";

// back button icon for header
export default function TutorialButton() {
  const testerTutorialPage = () => {
    Alert.alert("tutorial page to be implemented");
  };
  const windowWidth = Dimensions.get("window").width;

  return (
    <TouchableOpacity onPress={testerTutorialPage}>
      <Image
        source={require("../../images/tutorial.png")}
        style={{
          width: 50,
          height: 50,
          marginLeft: windowWidth - 70,
          marginTop: 115,
        }}
      />
    </TouchableOpacity>
  );
}

import React from "react";
import Modal from "react-native-modal";
import { View, TouchableOpacity, Text } from "react-native";
import dynamicStyles from "../../Style/styles";
import { useTheme } from "../../Style/ThemeContext";

export default function TesterResultsModal({ isVisible, toggleTutorial }) {
  const styles = dynamicStyles();
  const { getAppTheme } = useTheme();
  const appTheme = getAppTheme();

  return (
    <Modal isVisible={isVisible} style={styles.center} backdropOpacity={0.8}>
      <View
        style={[
          styles.center,
          {
            width: 320,
            height: 310,
            backgroundColor: appTheme.MODAL,
            borderRadius: 30,
            padding: 20,
          },
        ]}
      >
        <Text
          style={[
            styles.h3,
            {
              paddingBottom: 10,
              marginTop: 20,
              fontWeight: "bold",
              color: appTheme.TEXT_STANDARD,
            },
          ]}
        >
          Understanding Your Results
        </Text>
        <Text style={[styles.body, { color: appTheme.TEXT_STANDARD }]}>
          Your test results are important for assessing your hearing
          capabilities which will be used in the frequency adjuster. If you have
          any concerns about the accuracy of your results, feel free to retake
          the test now or later.
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            {
              marginTop: 10,
              borderRadius: 30,
              backgroundColor: appTheme.CANCEL,
            },
          ]}
          onPress={() => toggleTutorial(!isVisible)}
        >
          <Text style={[styles.h3, { color: appTheme.TEXT_STANDARD }]}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

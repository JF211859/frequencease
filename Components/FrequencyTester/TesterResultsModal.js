import React from "react";
import Modal from "react-native-modal";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../Style/styles";
import { COLORS } from "../../Style/colorScheme";

export default function TesterResultsModal({ isVisible, toggleTutorial }) {
  return (
    <Modal isVisible={isVisible} style={styles.center} backdropOpacity={0.8}>
      <View
        style={[
          styles.center,
          {
            width: 320,
            height: 310,
            backgroundColor: "white",
            borderRadius: 30,
            padding: 20,
          },
        ]}
      >
        <Text
          style={[
            styles.h3,
            { paddingBottom: 10, marginTop: 20, fontWeight: "bold" },
          ]}
        >
          Understanding Your Results
        </Text>
        <Text style={styles.body}>
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
              backgroundColor: COLORS.RED,
            },
          ]}
          onPress={() => toggleTutorial(!isVisible)}
        >
          <Text style={styles.h3}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

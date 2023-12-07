import React from "react";
import Modal from "react-native-modal";
import { View, TouchableOpacity, Text } from "react-native";
import dynamicStyles from "../../Style/styles";
import { COLORS } from "../../Style/colorScheme";
import { useTheme } from "../../Style/ThemeContext";

export default function TesterTutorialModal({ isVisible, toggleTutorial }) {
  const styles = dynamicStyles();
  const { getAppTheme } = useTheme();
  const appTheme = getAppTheme();

  return (
    <Modal isVisible={isVisible} style={styles.center} backdropOpacity={0.8}>
      <View
        style={[
          styles.center,
          {
            width: 300,
            height: 320,
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
          Tutorial
        </Text>
        <Text style={[styles.body, { color: appTheme.TEXT_STANDARD }]}>
          Press the play button to listen to the current sound. If you can hear
          the sound, select the thumbs up button ("Yes") on the right. If you
          can't hear the sound, select the thumbs down ("No") button on the
          left.
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

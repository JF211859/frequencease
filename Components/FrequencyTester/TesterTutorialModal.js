import React from "react";
import Modal from "react-native-modal";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../Style/styles";
import { COLORS } from "../../Style/colorScheme";

export default function TesterTutorialModal({ isVisible, toggleTutorial }) {
  return (
    <Modal isVisible={isVisible} style={styles.center} backdropOpacity={0.8}>
      <View
        style={[
          styles.center,
          {
            width: 300,
            height: 320,
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
          Tutorial
        </Text>
        <Text style={styles.body}>
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

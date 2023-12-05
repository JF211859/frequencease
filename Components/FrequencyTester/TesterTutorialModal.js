import React from "react";
import Modal from "react-native-modal";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../Style/styles";
import { COLORS } from "../../Style/colorScheme";

export default function TesterTutorialModal({ showModal, onClose }) {
  return (
    <Modal isVisible={showModal} style={styles.center} backdropOpacity={0.8}>
      <View
        style={[
          styles.center,
          {
            width: 300,
            height: 300,
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
          The frequency test contains three phases to test your lower and upper
          hearing range. Play the test sound, follow the progress bar, and use
          the yes/no buttons to respond. Good luck!
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
          onPress={() => onClose()}
        >
          <Text style={styles.h3}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

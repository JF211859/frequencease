import React from "react";
import Modal from "react-native-modal";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../Style/styles";
import { COLORS } from "../../Style/colorScheme";

export default function TesterTutorialModal({ showModal }) {
  const [isModalVisible, setModalVisible] = React.useState(showModal);

  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.center}
      backdropOpacity={0.8}
    >
      <View
        style={[
          styles.center,
          {
            width: 400,
            height: 400,
            backgroundColor: "white",
            borderRadius: 30,
            padding: 20,
          },
        ]}
      >
        <Text style={[styles.h2, { paddingBottom: 20, marginTop: 20 }]}>
          The frequency test contains three phases to test your lower and uppper
          hearing range. Play the test sound, follow the progress bar, and use
          the yes/no buttons to respond. Good luck!
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderRadius: 30,
              backgroundColor: COLORS.RED,
            },
          ]}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.h3}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

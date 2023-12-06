import React from "react";
import Modal from "react-native-modal";
import { View, TouchableOpacity, Text } from "react-native";
import dynamicStyles from "../../Style/styles";
import { COLORS } from "../../Style/colorScheme";
import { Audio } from "expo-av";
import { useTheme } from "../../Style/ThemeContext";

export default function TesterModal({ phase }) {
  const styles = dynamicStyles();

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [ringtonePlayed, setRingtonePlayed] = React.useState(false);
  const { getAppTheme } = useTheme();
  const appTheme = getAppTheme();

  React.useEffect(() => {
    if (phase === 0) {
      setModalVisible(true);
    }
  }, []);

  const playRingtone = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require("../../audio/ringtone.mp3"));
      await soundObject.playAsync();
      soundObject.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setRingtonePlayed(true);
        }
      });
    } catch (error) {
      console.error("Error loading sound", error);
    }
  };

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
            width: 300,
            height: 300,
            backgroundColor: appTheme.MODAL,
            borderRadius: 30,
            padding: 20,
          },
        ]}
      >
        <Text
          style={[
            styles.h2,
            { paddingBottom: 20, marginTop: 20, color: appTheme.TEXT_STANDARD },
          ]}
        >
          Please turn on your device's ringer before starting the test. 😃
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            {
              width: 220,
              marginBottom: 15,
              borderRadius: 30,
              backgroundColor: appTheme.APP_BLUE,
            },
          ]}
          onPress={playRingtone}
        >
          <Text
            style={[styles.h2, { marginTop: 0, color: appTheme.TEXT_STANDARD }]}
          >
            Play Test Audio
          </Text>
        </TouchableOpacity>
        {ringtonePlayed && (
          <TouchableOpacity
            style={[
              styles.button,
              {
                borderRadius: 30,
                backgroundColor: appTheme.CONFIRM,
              },
            ]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={[styles.h3, { color: appTheme.TEXT_STANDARD }]}>
              Okay, I'm ready!
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}

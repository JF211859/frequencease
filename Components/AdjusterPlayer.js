import * as React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import styles from "../Style/styles";
import { APP_THEME, COLORS } from "../Style/colorScheme";

function SoundPlayer({ mp3 }) {
  const sound = React.useRef(new Audio.Sound());
  const [Status, SetStatus] = React.useState(false);
  const [audioProgress, setAudioProgress] = React.useState(0);
  const audioLength = 0;

  React.useEffect(() => {
    LoadAudio();
    return () => sound.current.unloadAsync();
  }, []);

  const LoadAudio = async () => {
    const checkLoading = await sound.current.getStatusAsync();
    // Get Loading Status
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(mp3, {}, true);
        audioLength = result.durationMillis;
        if (result.isLoaded === false) {
          console.log("Error in Loading Audio");
        } else {
          await playSound();
        }
      } catch (error) {
        console.log("Error in Loading Audio");
      }
    } else {
      console.log("Error in Loading Audio");
    }
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          SetStatus(true);
          console.log("Audio playing");
        }
      } else {
        LoadAudio();
      }
    } catch (error) {
      SetStatus(false);
    }
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
          SetStatus(false);
          console.log("Audio paused");
        }
      }
    } catch (error) {
      SetStatus(false);
    }
  };

  const StopAudio = async () => {
    try {
      sound.current.pauseAsync();
      sound.current.setPositionAsync(0);
      SetStatus(false);
      console.log("Audio stopped");
    } catch (error) {
      SetStatus(false);
    }
  };

  const ReplayAudio = async () => {
    try {
      sound.current.replayAsync();
      SetStatus(true);
      console.log("Audio replaying");
    } catch (error) {
      SetStatus(false);
    }
  };

  return (
    <View>
      <View style={styles.progressBar}>
        <Slider
          style={[styles.slider, styles.margin]}
          minimumValue={0}
          maximumValue={audioLength}
          minimumTrackTintColor={COLORS.MEDIUM_BLUE}
          maximumTrackTintColor={COLORS.LIGHT_GREY}
          value={audioProgress}
          onValueChange={setAudioProgress}
          step={1}
        />
        <View
          style={[
            styles.margin,
            styles.row,
            { justifyContent: "space-between" },
          ]}
        >
          <Text>0:00</Text>
          <Text>{audioLength}</Text>
        </View>
      </View>

      <View style={[styles.row, { justifyContent: "space-around" }]}>
        <TouchableOpacity
          onPress={Status === false ? () => PlayAudio() : () => PauseAudio()}
          style={styles.circleButton}
        >
          <Image
            source={
              Status === false
                ? require("../images/play.png")
                : require("../images/pause.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={StopAudio} style={[styles.circleButton]}>
          <Image source={require("../images/stop.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={ReplayAudio} style={styles.circleButton}>
          <Image
            source={require("../images/replay-music.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SoundPlayer;

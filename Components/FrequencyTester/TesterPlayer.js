import * as React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigationState } from "@react-navigation/native";

import { Audio } from "expo-av";
import styles from "../../Style/styles";

function SoundPlayer({ mp3 }) {
  const navigation = useNavigationState((state) => state);
  const [sound] = React.useState(new Audio.Sound());
  const [status, setStatus] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState({
    src: require("../images/play.png"),
  }); //change play/pause button with state variable

  React.useEffect(() => {
    PauseAudio();
    setStatus(false);
    return () => sound.unloadAsync();
  }, [navigation]); //pause audio when screen changes
  // TODO: does not work for nav bar view change

  React.useEffect(() => {
    LoadAudio();
    setStatus(false);
    return () => sound.unloadAsync();
  }, [mp3]); //reload audio when the audio file changes/ go to next phase

  React.useMemo(() => {
    if (status === false) {
      setImageSrc({
        src: require("../images/play.png"),
      });
    } else {
      setImageSrc({
        src: require("../images/pause.png"),
      });
    }
  }, [status]); // update play/ pause image

  const LoadAudio = async () => {
    const checkLoading = await sound.getStatusAsync();
    // Get Loading Status
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.loadAsync(mp3, {}, true);
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
      const result = await sound.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.playAsync();
          setStatus(true);
          console.log("Audio playing");
        }
      } else {
        LoadAudio();
      }
    } catch (error) {
      setStatus(false);
    }
    return () => {
      sound && sound.unloadAsync();
    };
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.pauseAsync();
          setStatus(false);
          console.log("Audio paused");
        }
      }
    } catch (error) {
      setStatus(false);
    }
  };

  const ReplayAudio = async () => {
    try {
      sound.replayAsync();
      setStatus(true);
      console.log("Audio replaying");
    } catch (error) {
      setStatus(false);
    }
  };

  return (
    <View style={[styles.row, { justifyContent: "space-around" }]}>
      <TouchableOpacity
        onPress={status === false ? () => PlayAudio() : () => PauseAudio()}
        style={styles.circleButton}
      >
        <Image source={imageSrc.src} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={ReplayAudio} style={styles.circleButton}>
        <Image
          source={require("../images/replay-music.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

export default SoundPlayer;

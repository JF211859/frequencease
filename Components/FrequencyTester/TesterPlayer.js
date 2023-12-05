import * as React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigationState } from "@react-navigation/native";

import { Audio } from "expo-av";
import styles from "../../Style/styles";

function SoundPlayer({ mp3, progressRef, soundPlayed }) {
  const navigation = useNavigationState((state) => state);
  const [sound] = React.useState(new Audio.Sound());
  const [status, setStatus] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState({
    src: require("../../images/play.png"),
  }); //change play/pause button with state variable

  React.useEffect(() => {
    progressRef.current.pause();
  }, []); //set initial circular progress bar to paused

  React.useEffect(() => {
    PauseAudio();
    setStatus(false);
    return () => sound.unloadAsync();
  }, [navigation]); //pause audio when screen changes (TODO: unsure if this works)

  React.useEffect(() => {
    LoadAudio();
    setStatus(false);
    progressRef.current.reAnimate();
    progressRef.current.pause();
    return () => sound.unloadAsync();
  }, [mp3]); //reload audio when the audio file changes/ go to next phase

  React.useMemo(() => {
    if (status === false) {
      setImageSrc({
        src: require("../../images/play.png"),
      });
    } else {
      setImageSrc({
        src: require("../../images/pause.png"),
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
      console.log("Audio already loaded");
    }
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.playAsync();
          progressRef.current.play();
          setStatus(true);
          console.log("Audio playing");
          // when audio finishes, change to pause button and restart audio
          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              setStatus(false);
              soundPlayed();
              sound.setPositionAsync(0);
              //reset circular progress
              progressRef.current.reAnimate();
              progressRef.current.pause();
            }
          });
        }
      } else {
        LoadAudio();
      }
    } catch (error) {
      setStatus(false);
    }
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.pauseAsync();
          progressRef.current.pause();
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
      progressRef.current.reAnimate();
      console.log("Audio replaying");
    } catch (error) {
      setStatus(false);
    }
  };

  return (
    <View
      style={[styles.row, { justifyContent: "space-around", maxWidth: "60%" }]}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity
          onPress={status === false ? () => PlayAudio() : () => PauseAudio()}
          style={styles.circleButton}
        >
          <Image source={imageSrc.src} style={styles.icon} />
        </TouchableOpacity>

        <Text style={[styles.h2]}>{status === false ? "Play" : "Pause"}</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity onPress={ReplayAudio} style={styles.circleButton}>
          <Image
            source={require("../../images/replay-music.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={[styles.h2]}>Replay</Text>
      </View>
    </View>
  );
}

export default SoundPlayer;

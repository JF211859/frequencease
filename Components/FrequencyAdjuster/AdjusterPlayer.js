import * as React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { APP_THEME, COLORS } from "../../Style/colorScheme";
import styles from "../../Style/styles";
import SeekBar from "./SeekBar";

export default function SoundPlayer(props) {

  const sound = React.useRef(new Audio.Sound());
  const [Status, setStatus] = React.useState(false); // isPlaying
  // Seekbar variables
  const [totalLength, setTotalLength] = React.useState(1);
  const [currentPos, setCurrentPos] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState(0);
  const [currentURI, setURI] = React.useState("");

  // get audio length from sound
  const setDuration = (sound) => {
    setTotalLength(sound.durationMillis);
  };

  const setTime = (sound, pos) => {
    console.log("Set time: " + pos);
    sound.current.positionMillis = pos
    setCurrentPos(pos);
  };

  const seek = (pos) => {
    if (currentURI === "NOT SET"){
      LoadAudio();
    }
    console.log("Seeking " + pos);
    setCurrentPos(pos);
    sound.current.playFromPositionAsync(pos);
    setStatus(true);
    clearInterval(intervalId);
    const interval = setInterval(updatePos, 300);
    setIntervalId(interval);
  };

  const updatePos = async () => {
    try {
      // is playing
      const result = await sound.current.getStatusAsync();
      if (result.isPlaying) {
        setCurrentPos(result.positionMillis);
      }
      // console.log("update");
    }
    catch (error) {
      clearInterval(intervalId);
    }
  }

  const LoadAudio = async () => {
    shiftedURI = props.getShiftedURI();

    if (shiftedURI === "NOT SET"){
      console.log("Attempting to load before audio is recorded!");
    }
    else if (shiftedURI === currentURI) {
      console.log("Already loaded");
    }

    else{
      try {
        console.log("props.shiftedURI = " + shiftedURI);
        await sound.current.unloadAsync();
        let result = await sound.current.loadAsync({uri: shiftedURI});
        console.log(sound.current);
        setURI(result.uri);
        setTime(sound, 0);
        setDuration(result);
        if (result.isLoaded === false) {
          console.log("Error in Loadng Audio");
        } else {
          await PlayAudio();
        }
      } catch (error) {
        console.log("Error in Loading Audio: " + error);
      }
    }
  };
  
  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          if (currentPos === totalLength) {
            sound.current.playFromPositionAsync(0);
          }
          else {
            sound.current.playFromPositionAsync(currentPos);
          }
          setStatus(true);
          const interval = setInterval(updatePos, 300);
          setIntervalId(interval);
          console.log("Audio playing");
          sound.current.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              setStatus(false);
              clearInterval(intervalId);
              setCurrentPos(totalLength);
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
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
          setStatus(false);
          clearInterval(intervalId);
          console.log("Audio paused");
        }
      }
    } catch (error) {
      setStatus(false);
    }
  };

  const StopAudio = async () => {
    try {
      sound.current.stopAsync();
      setStatus(false);
      setTime(sound, 0);
      clearInterval(intervalId);
      console.log("Audio stopped");
    } catch (error) {
      setStatus(false);
    }
  };

  const ReplayAudio = async () => {
    try {
      LoadAudio();
      clearInterval(intervalId);
      sound.current.replayAsync();
      setStatus(true);
      setTime(sound, 0);
      const interval = setInterval(updatePos, 300);
      setIntervalId(interval);
      console.log("Audio replaying");
    } catch (error) {
      setStatus(false);
    }
  };

  return (
    <View>
      <View style={styles.progressBar}>
        <SeekBar
          onSlidingStart={() => PauseAudio()}
          onSeek={(value) => seek(value)}
          trackLength={totalLength}
          currentPosition={currentPos}
        />
      </View>

      <View style={[styles.row, { justifyContent: "space-around" }]}>
        <TouchableOpacity
          onPress={Status === false ? () => PlayAudio() : () => PauseAudio()}
          style={styles.circleButton}
        >
          <Image
            source={
              Status === false
                ? require("../../images/play.png")
                : require("../../images/pause.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={StopAudio} style={[styles.circleButton]}>
          <Image source={require("../../images/stop.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={ReplayAudio} style={styles.circleButton}>
          <Image
            source={require("../../images/replay-music.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
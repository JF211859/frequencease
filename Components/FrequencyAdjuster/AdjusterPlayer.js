import * as React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";
import styles from "../../Style/styles";
import { COLORS } from "../../Style/colorScheme";
import SeekBar from "./SeekBar";
import Modal from "react-native-modal";

export default function SoundPlayer(props) {

  const sound = React.useRef(new Audio.Sound());
  const [Status, setStatus] = React.useState(false); // isPlaying
  // Seekbar variables
  const [totalLength, setTotalLength] = React.useState(1);
  const [currentPos, setCurrentPos] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState(0);
  const [currentURI, setURI] = React.useState("");

  // Error message modal
  const [isModalVisible, setModalVisible] = React.useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // get audio length from sound
  const setDuration = (sound) => {
    print("-----------------");
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
      // onPlaybackStatusUpdate stopped the audio
      else if (!result.isPlaying) {
        //console.log(intervalId);
        clearInterval(intervalId); // FIXME: gets old intervalId, doesn't clear
        setCurrentPos(result.durationMillis);
      }
    }
    catch (error) {
      console.log("updatePos error: " + error);
      clearInterval(intervalId);
    }
  }

  const LoadAudio = async () => {
    shiftedURI = props.getShiftedURI();

    if (shiftedURI === "NOT SET"){
      console.log("Attempting to load before audio is recorded!");
      openModal();
      return;
    }
    else if (shiftedURI === currentURI) {
      console.log("Already loaded");
      return;
    }
    else {
      try {
        console.log("props.shiftedURI = " + shiftedURI);
        await sound.current.unloadAsync();
        let result = await sound.current.loadAsync({uri: shiftedURI});
        console.log(sound.current);
        setURI(result.uri);
        setTime(sound, 0);
        setDuration(result);
        
        // start playing audio
        // If playing from load, start from 0
        sound.current.playFromPositionAsync(0);
        setStatus(true);
        const interval = setInterval(updatePos, 300);
        setIntervalId(interval);

        sound.current.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setStatus(false);
          }
        });
      } catch (error) {
        console.log("Error in Loading Audio: " + error);
      }
    }
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded && shiftedURI === currentURI) {
        // FIXME: if you press play instead of replay when loading new audio
        if (result.isPlaying === false) {
          sound.current.playFromPositionAsync(currentPos);
          setStatus(true);
          const interval = setInterval(updatePos, 300);
          setIntervalId(interval);
          console.log("Audio playing");
          sound.current.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              setStatus(false);
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
      if (shiftedURI === "NOT SET"){
        openModal();
        return;
      }
      sound.current.stopAsync();
      setStatus(false);
      setTime(sound, 0);
      clearInterval(intervalId);
      console.log("Audio stopped: " + intervalId);
    } catch (error) {
      setStatus(false);
    }
  };

  const ReplayAudio = async () => {
    try {
      if (shiftedURI === currentURI) {
        clearInterval(intervalId);
        sound.current.replayAsync();
        setStatus(true);
        setTime(sound, 0);

        const interval = setInterval(updatePos, 300);
        setIntervalId(interval);
        sound.current.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setStatus(false);
          }
        });
        console.log("Audio replaying");
      }
      else {
        LoadAudio();
      }
    } catch (error) {
      setStatus(false);
    }
  };

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        style={styles.center}
        backdropOpacity={0.8}
      >
        <View
          style={[
            styles.center,
            {
              width: 250,
              height: 200,
              backgroundColor: "white",
              borderRadius: 30,
              padding: 20,
            },
          ]}
        >
          <Text style={styles.body}>
            You need to record or import an audio first!
          </Text>

          <View style={[styles.row, { justifyContent: "space-around" }]}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderRadius: 30,
                  backgroundColor: COLORS.RED,
                  marginRight: 10,
                  marginTop: 20,
                },
              ]}
              onPress={() => closeModal()}
            >
              <Text style={styles.h3}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.progressBar}>
        <SeekBar
          uri={props.getShiftedURI()}
          onSlidingStart={() => PauseAudio()}
          onSeek={(value) => seek(value)}
          trackLength={totalLength}
          currentPosition={currentPos}
        />
      </View>

      <View style={[styles.row, { justifyContent: "space-around" }]}>
        <TouchableOpacity
          onPress={Status === false ? () => PlayAudio() : () => PauseAudio()}
          style = {
            props.getShiftedURI() === "NOT SET"
              ? [styles.circleButton, {backgroundColor: COLORS.GREY}]
              : styles.circleButton
            }
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

        <TouchableOpacity
          onPress={StopAudio}
          style = {
            props.getShiftedURI() === "NOT SET"
              ? [styles.circleButton, {backgroundColor: COLORS.GREY}]
              : styles.circleButton
            }
        >
          <Image source={require("../../images/stop.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ReplayAudio}
          style = {
            props.getShiftedURI() === "NOT SET"
              ? [styles.circleButton, {backgroundColor: COLORS.GREY}]
              : styles.circleButton
            }
        >
          <Image
            source={require("../../images/replay-music.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
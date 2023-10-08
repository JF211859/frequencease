import * as React from 'react';
import { View, Image, TouchableOpacity, Dimensions, Text} from 'react-native';
import { Audio } from 'expo-av';
import styles from "../Style/styles";

function SoundPlayer({ mp3 }) {
  const sound = React.useRef(new Audio.Sound());
  const [Status, SetStatus] = React.useState(false);
    
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
          if (result.isLoaded === false) {
            console.log('Error in Loading Audio');
          } else {
            await playSound();
          }
        } catch (error) {
          console.log('Error in Loading Audio');
        }
      } else {
        console.log('Error in Loading Audio');
      }
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          SetStatus(true);
          console.log('Audio playing');
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
          console.log('Audio paused');
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
      console.log('Audio stopped');
    } catch (error) {
      SetStatus(false);
    }
  };

  const ReplayAudio = async () => {
    try {
      sound.current.replayAsync();
      SetStatus(true);
      console.log('Audio replaying');
    } catch (error) {
      SetStatus(false);
    }
  };

  return (
    <View style={[styles.row, {justifyContent: 'space-around'}]}>
      <TouchableOpacity
        onPress={Status === false ? () => PlayAudio() : () => PauseAudio()}
        style={styles.circleButton}>
        <Image
          source={Status === false ? require('../images/play.png') : require('../images/pause.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={ReplayAudio}
        style={styles.circleButton}>
        <Image
          source={require('../images/replay-music.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

export default SoundPlayer;
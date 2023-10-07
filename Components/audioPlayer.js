import * as React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import { Audio } from 'expo-av';

const windowWidth = Dimensions.get("window").width;

function SoundPlayer({ mp3 }) {
  const sound = React.useRef(new Audio.Sound());
  const [Status, SetStatus] = React.useState(false);
  const playPausePosition = (windowWidth / 2) - 115;
  const replayPosition = 90;
    
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

  const ReplayAudio = async () => {
    try {
      sound.current.replayAsync();
      console.log('Audio replaying');
    } catch (error) {
      SetStatus(false);
    }
  };

  return (
    <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={Status === false ? () => PlayAudio() : () => PauseAudio()}>
        <Image
          source={Status === false ? require('../images/play.png') : require('../images/pause.png')}
          style={{width: 70, height: 70, marginTop: 50, marginLeft: playPausePosition}}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={ReplayAudio}>
        <Image
          source={require('../images/replay.png')}
          style={{width: 70, height: 70, marginTop: 50, marginLeft: replayPosition}}
        />
      </TouchableOpacity>
    </View>
  );
}

export default SoundPlayer;

const styles = StyleSheet.create({});
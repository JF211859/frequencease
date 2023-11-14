import { Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import styles from "../../Style/styles";

export default function RecordAndPlayback() {

  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('Record');
  const [audioPermission, setAudioPermission] = useState(null);
  const sound = React.useRef(new Audio.Sound());
  const [Status, SetStatus] = React.useState(false);
  const [audioProgress, setAudioProgress] = React.useState(0);
  let audioLength = 0;


  useEffect(() => {

    // Simply get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync().then((permission) => {
        console.log('Permission Granted: ' + permission.granted);
        setAudioPermission(permission.granted)
      }).catch(error => {
        console.log(error);
      });
    }

    // Call function to get permission
    getPermission()
    // Cleanup upon first render
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording() {
    try {
      // needed for IoS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        })
      }

      const newRecording = new Audio.Recording();
      console.log('Starting Recording')
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('Stop');

    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  async function uploadAudioAsync(uri) {
    console.log("Uploading " + uri);

    const uplaodURL = 'https://frequenceaseapi-3k7cjdpwya-uc.a.run.app/adjuster/?min_frequency=0&max_frequency=800';

    var uploaded_audio = {
      uri: uri,
      type: 'audio/wav',
      name: 'file',
    };

    var body = new FormData();
    body.append('file', uploaded_audio);

    let formData = new FormData();
    formData.append('file', {
      uri: uri
    });

    console.log("POSTing " + uri + " to " + uplaodURL);
    return await fetch(uplaodURL, {method: 'POST', body})
    .then(response => response.text())
    .then(text => {
      return text;
    });
  };

  async function stopRecording() {
    try {

      if (recordingStatus === 'Stop') {
        console.log('Stopping Recording');
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();
        console.log('URI: ', recordingUri);

        const shiftedUrl = await uploadAudioAsync(recordingUri);

        console.log("local = " + shiftedUrl);

        this.shiftedURI = shiftedUrl;

        setRecording(null);
        setRecordingStatus('Record');
      }

    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  function getShiftedUrl () {
    console.log("url = " + this.shiftedURI);
    return this.shiftedURI;
  };

  async function handleRecordButtonPress() {
    if (recording) {
      await stopRecording(recording);
      console.log("shiftedURI = " + this.shiftedURI);
      console.log("recording = " + recording);
      console.log("recordingStatus = " + recordingStatus);
    } else {
      await startRecording();
    }
  };

  const LoadAudio = async () => {
    const checkLoading = await sound.current.getStatusAsync();
    // Get Loading Status
    if (checkLoading.isLoaded === false) {
      try {

        await UploadAudio();

        console.log("Loading Audio");

        const result = await sound.current.loadAsync({uri: this.shiftedURI});
        audioLength = result.durationMillis;
        if (result.isLoaded === false) {
          console.log("Error in Loading Audio");
        } else {
          await PlayAudio();
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
      await sound.current.replayAsync();
      SetStatus(true);
      console.log("Audio replaying");
      console.log(sound.current.getStatus());
    } catch (error) {
      SetStatus(false);
    }
  };

  return (

    <View>
      <View style={[styles.center, styles.margin]}>
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

      <View style={[styles.row, styles.bottomButtons, styles.margin]}>
        <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
          <Text style={styles.body}> {`${recordingStatus}`} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import styles from "../../Style/styles";
// import UploadToServer from "./UploadToServer"

export default function RecordAndPlayback() {

  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('Record');
  const [audioPermission, setAudioPermission] = useState(null);

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
  }

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
  }

  const getAudioFromApiAsync = async (uri) => {
    try {
      const new_uri = uploadAudioAsync(uri);
      console.log(new_uri);
      return new_uri;
    } catch (error) {
      console.error(error);
    }
  };

  async function stopRecording() {
    try {

      if (recordingStatus === 'Stop') {
        console.log('Stopping Recording')
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();
        console.log('URI: ', recordingUri);

        console.log(await getAudioFromApiAsync(recordingUri));

        // Create a file name for the recording
        const fileName = `recording-${Date.now()}.wav`;

        // Move the recording to the new directory with the new file name
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
        await FileSystem.moveAsync({
          from: recordingUri,
          to: FileSystem.documentDirectory + 'recordings/' + `${fileName}`
        });

        // This is for simply playing the sound back
        const playbackObject = new Audio.Sound();
        await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${fileName}` });
        await playbackObject.playAsync();

        // resert our states to record again
        setRecording(null);
        setRecordingStatus('Record');
      }

    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log('Saved audio file to', savedUri);
      }
    } else {
      await startRecording();
    }
  }

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
        <Text style={styles.body}> {`${recordingStatus}`} </Text>
      </TouchableOpacity>
    </View>
  );
}
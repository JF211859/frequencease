import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useState } from "react";
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import styles from "../../Style/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ImportFile(props) {
  const [audio, setAudio] = React.useState([]);

  const changeShiftedURL = () => props.changeShiftedURI(this.shiftedURI);

  async function uploadAudioAsync(uri) {
    const storedMin = await AsyncStorage.getItem('MinFrequency');
    const storedMax = await AsyncStorage.getItem('MaxFrequency');

    console.log("Uploading " + uri);

    const uploadURL = 'https://frequenceaseapi-3k7cjdpwya-uc.a.run.app/adjuster/?min_frequency='+storedMin+'&max_frequency='+storedMax;

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

    console.log("POSTing " + uri + " to " + uploadURL);
    return await fetch(uploadURL, {method: 'POST', body})
    .then(response => response.text())
    .then(text => {
      return text;
    });
  };

  async function pick() {
    setAudio(await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
      copyToCacheDirectory: true
    }));
    console.log(audio.assets[0].uri);

    const audioUri = audio.assets[0].uri;

    const shiftedUrl = await uploadAudioAsync(audio.assets[0].uri);
    console.log("local = " + shiftedUrl);

    this.shiftedURI = shiftedUrl;

    changeShiftedURL();

    // const soundObject = new Audio.Sound();
    // soundObject.setOnPlaybackStatusUpdate();

    // await soundObject.loadAsync({ uri: audioUri });
    // await soundObject.playAsync();
  }

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

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={pick}>
        <Text style={styles.body}> Import File </Text>
      </TouchableOpacity>

      {/* FOR DEBUGGING
      <TouchableOpacity style={styles.button} onPress={playAudio}>
        <Text style={styles.body}> PLAY </Text>
      </TouchableOpacity> */}
    </View>
  );
}
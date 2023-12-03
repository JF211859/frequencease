import { Text, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
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

    const audioUri = audio.assets[0].uri;
    console.log(audioUri);

    try {
      const shiftedUrl = await uploadAudioAsync(audioUri);
      Alert.alert("Upload successful!", audio.assets[0].name + " uploaded.");
      console.log("local = " + shiftedUrl);
      this.shiftedURI = shiftedUrl;
      changeShiftedURL();

    } catch (error) {
      console.error(error);
      Alert.alert("Upload failed", audio.assets[0].name + " failed to upload, please try again.")
    }
  }

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={pick}>
        <Text style={styles.body}> Import File </Text>
      </TouchableOpacity>
    </View>
  );
}
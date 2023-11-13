import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useState } from "react";
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import styles from "../../Style/styles";

export default function ImportFile() {
  const [audio, setAudio] = React.useState([]);

  async function pick() {
    setAudio(await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
      copyToCacheDirectory: true
    }));
    console.log(audio.assets[0].uri);

    const audioUri = audio.assets[0].uri;

    const soundObject = new Audio.Sound();
    soundObject.setOnPlaybackStatusUpdate();

    await soundObject.loadAsync({ uri: audioUri });
    await soundObject.playAsync();
  }

  async function playAudio() {
    const audioUri = audio.assets[0].uri;

    const soundObject = new Audio.Sound();
    soundObject.setOnPlaybackStatusUpdate();

    await soundObject.loadAsync({ uri: audioUri });
    await soundObject.playAsync();
  }

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
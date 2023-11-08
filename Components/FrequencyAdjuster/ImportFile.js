import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useState } from "react";
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import styles from "../../Style/styles";

export default function ImportFile() {
  const [audio, setAudio] = useState();

  _pickDocument = async () => {
    setAudio(
      await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      })
    );
  }

  async function pick() {
    try {
      result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      })
      console.log(
          result.uri,
          result.type,
          result.name,
          result.size
        );
    } catch (error) {
      console.error('Failed to upload/user canceled upload', error);
    }
  }

  async function playAudio() {
    const audioUri = audio.uri;

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

      <TouchableOpacity style={styles.button} onPress={playAudio}>
        <Text style={styles.body}> PLAY </Text>
      </TouchableOpacity>
    </View>
  );
}
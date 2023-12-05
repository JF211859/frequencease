import { Text, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
import React, { useState } from "react";
import { Audio } from 'expo-av';
import { COLORS } from "../../Style/colorScheme";
import Modal from "react-native-modal";
import * as DocumentPicker from 'expo-document-picker';
import styles from "../../Style/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ImportFile(props) {
  const [audio, setAudio] = React.useState([]);
  const [isImportModalVisible, setImportModalVisible] = React.useState(false);

  const closeAll = () => {
    setImportModalVisible(false);
  };

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
      setImportModalVisible(true);
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
      <Modal
        isVisible={isImportModalVisible}
        style={styles.center}
        backdropOpacity={0.8}
      >
        <View
          style={[
            styles.center,
            {
              width: 300,
              height: 300,
              backgroundColor: "white",
              borderRadius: 30,
              padding: 20,
            },
          ]}
        >
          <Text
            style={[
              styles.h3,
              { paddingBottom: 20, marginTop: 20, fontWeight: "bold" },
            ]}
          >
            Upload Successful!
          </Text>
          <Text style={styles.body}>
            Your audio has been imported successfully!
            Press play to hear the adjusted audio 🔊
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
              onPress={() => closeAll()}
            >
              <Text style={styles.h3}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={pick}>
        <Text style={styles.body}> Import File </Text>
      </TouchableOpacity>
    </View>
  );
}
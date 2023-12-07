import { Text, TouchableOpacity, View, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Audio } from "expo-av";
import { COLORS } from "../../Style/colorScheme";
import Modal from "react-native-modal";
import * as DocumentPicker from "expo-document-picker";
import dynamicStyles from "../../Style/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../Style/ThemeContext";

export default function ImportFile(props) {
  const styles = dynamicStyles();
  const { isDarkMode, toggleTheme, getAppTheme } = useTheme();
  const appTheme = getAppTheme();
  const [audio, setAudio] = React.useState([]);
  const [isImportModalVisible, setImportModalVisible] = React.useState(false);
  const [isFailedModalVisible, setFailedModalVisible] = React.useState(false);

  const closeImport = () => {
    setImportModalVisible(false);
  };
  const closeFailed = () => {
    setFailedModalVisible(false);
  };

  const changeShiftedURL = () => props.changeShiftedURI(this.shiftedURI);

  async function uploadAudioAsync(uri) {
    const storedMin = await AsyncStorage.getItem("MinFrequency");
    const storedMax = await AsyncStorage.getItem("MaxFrequency");

    console.log("Uploading " + uri);

    const uploadURL =
      "https://frequenceaseapi-3k7cjdpwya-uc.a.run.app/adjuster/?min_frequency=" +
      storedMin +
      "&max_frequency=" +
      storedMax;

    var uploaded_audio = {
      uri: uri,
      type: "audio/wav",
      name: "file",
    };

    var body = new FormData();
    body.append("file", uploaded_audio);

    let formData = new FormData();
    formData.append("file", {
      uri: uri,
    });

    console.log("POSTing " + uri + " to " + uploadURL);
    return await fetch(uploadURL, { method: "POST", body })
      .then((response) => response.text())
      .then((text) => {
        return text;
      });
  }

  async function pick() {
    try {
      upload = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true,
      });
      setAudio(upload);
    } catch (error) {
      console.log(error);
      setFailedModalVisible(true);
    }

    if (audio === null || audio.assets === null || audio.canceled === true) {
      setFailedModalVisible(true);
    } else {
      const audioUri = audio.assets[0].uri;
      console.log(audioUri);

      const shiftedUrl = await uploadAudioAsync(audioUri);
      setImportModalVisible(true);
      console.log("local = " + shiftedUrl);
      this.shiftedURI = shiftedUrl;
      changeShiftedURL();
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
              height: 250,
              backgroundColor: appTheme.MODAL,
              borderRadius: 30,
              padding: 20,
            },
          ]}
        >
          <Text
            style={[
              styles.h3,
              {
                paddingBottom: 20,
                marginTop: 20,
                fontWeight: "bold",
                color: appTheme.TEXT_STANDARD,
              },
            ]}
          >
            Upload Successful!
          </Text>
          <Text style={[styles.body, { color: appTheme.TEXT_STANDARD }]}>
            Your audio has been imported successfully! Press play to hear the
            adjusted audio 🔊
          </Text>

          <View style={[styles.row, { justifyContent: "space-around" }]}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderRadius: 30,
                  backgroundColor: appTheme.CANCEL,
                  marginRight: 10,
                  marginTop: 35,
                },
              ]}
              onPress={() => closeImport()}
            >
              <Text style={[styles.h3, { color: appTheme.TEXT_STANDARD }]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={isFailedModalVisible}
        style={styles.center}
        backdropOpacity={0.8}
      >
        <View
          style={[
            styles.center,
            {
              width: 300,
              height: 250,
              backgroundColor: appTheme.MODAL,
              borderRadius: 30,
              padding: 20,
            },
          ]}
        >
          <Text
            style={[
              styles.h3,
              {
                paddingBottom: 20,
                marginTop: 20,
                fontWeight: "bold",
                color: appTheme.TEXT_STANDARD,
              },
            ]}
          >
            Upload Failed
          </Text>
          <Text style={[styles.body, { color: appTheme.TEXT_STANDARD }]}>
            Your audio failed to upload, please try again 😔
          </Text>

          <View style={[styles.row, { justifyContent: "space-around" }]}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderRadius: 30,
                  backgroundColor: appTheme.CANCEL,
                  marginRight: 10,
                  marginTop: 40,
                },
              ]}
              onPress={() => closeFailed()}
            >
              <Text style={[styles.h3, { color: appTheme.TEXT_STANDARD }]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={pick}>
        <Text style={[styles.body, { color: appTheme.TEXT_STANDARD }]}>
          Import File
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import { Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import dynamicStyles from "../../Style/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../Style/ThemeContext";

export default function RecordAndPlayback(props) {
  const styles = dynamicStyles();
  const { getIsDarkMode, getAppTheme } = useTheme();
  const appTheme = getAppTheme();

  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("Record");
  const [audioPermission, setAudioPermission] = useState(null);

  const changeShiftedURL = () => props.changeShiftedURI(this.shiftedURI);

  useEffect(() => {
    // Simply get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync()
        .then((permission) => {
          console.log("Permission Granted: " + permission.granted);
          setAudioPermission(permission.granted);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Call function to get permission
    getPermission();
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
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new Audio.Recording();
      console.log("Starting Recording");
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus("Stop");
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }

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

  async function stopRecording() {
    try {
      if (recordingStatus === "Stop") {
        console.log("Stopping Recording");
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();
        console.log("URI: ", recordingUri);

        const shiftedUrl = await uploadAudioAsync(recordingUri);

        console.log("local = " + shiftedUrl);

        this.shiftedURI = shiftedUrl;

        setRecording(null);
        setRecordingStatus("Record");

        changeShiftedURL();
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      await stopRecording(recording);
      console.log("shiftedURI = " + this.shiftedURI);
      console.log("recording = " + recording);
      console.log("recordingStatus = " + recordingStatus);
    } else {
      await startRecording();
    }
  }

  const LoadAudio = async () => {
    const checkLoading = await sound.current.getStatusAsync();
    // Get Loading Status
    if (checkLoading.isLoaded === false) {
      try {
        await UploadAudio();

        console.log("Loading Audio");

        const result = await sound.current.loadAsync({ uri: this.shiftedURI });
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
      <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
        <Text style={[styles.body, { color: appTheme.TEXT_STANDARD }]}>
          {`${recordingStatus}`}{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

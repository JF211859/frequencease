import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import SwitchSelector from "react-native-switch-selector"; // https://www.npmjs.com/package/react-native-switch-selector
import { COLORS } from "../../Style/colorScheme";
import styles from "../../Style/styles";
import SoundPlayer from "./AdjusterPlayer";
import TutorialButton from "../ImageComponents/TutorialButton";
import RecordAndPlayback from "./RecordAndPlayback";
import ImportFile from "./ImportFile";
import { readData, MINFREQ_KEY, MAXFREQ_KEY } from "../Storage";
import Modal from "react-native-modal";

// This should be the home screen when app opens
export default function FrequencyAdjuster() {
  const windowHeight = useWindowDimensions().height;
  const [minFreq, setMinFreq] = React.useState(500);
  const [maxFreq, setMaxFreq] = React.useState(4000);

  // Modal for tutorial
  const [isRecordModalVisible, setRecordModalVisible] = React.useState(false);
  const [isImportModalVisible, setImportModalVisible] = React.useState(false);
  const [isPlayerModalVisible, setPlayerModalVisible] = React.useState(false);
  
  const recordModalNext = () => {
    setImportModalVisible(true);
    setRecordModalVisible(false);
  };
  const importModalNext = () => {
    setPlayerModalVisible(true);
    setImportModalVisible(false);
  };
  const closeAll = () => {
    setRecordModalVisible(false);
    setImportModalVisible(false);
    setPlayerModalVisible(false);
  }

  React.useEffect(() => {
    readData(MINFREQ_KEY).then((minFreqValue) => setMinFreq(minFreqValue));
    readData(MAXFREQ_KEY).then((maxFreqValue) => setMaxFreq(maxFreqValue));
  }, []);

  const openTutorial = () => {
    setRecordModalVisible(true);
  };

  state = {
    shiftedURI: "NOT SET",
  };

  changeShiftedURI = (shiftedURI) => {
    console.log("parent input = " + shiftedURI);
    this.state.URI = shiftedURI;
    // this.setState({URI: shiftedURI});
    console.log("parent state = " + this.state.URI);
  };

  getShiftedURI = () => {
    return this.state.URI;
  };

  return (
    <View style={{ height: { windowHeight }, flex: 1 }}>
      <Modal
        isVisible={isRecordModalVisible}
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
          <Text style={[styles.h3, { paddingBottom: 20, marginTop: 20 }]}>
            Record
          </Text>
          <Text style={styles.body}>
            Tap the Record button to start recording.
            When you are done recording, tap the button again to stop recording.
            The audio you recorded will be adjusted in the app!
          </Text>

          <View style={[styles.row, { justifyContent: "space-around" }]}>
            <TouchableOpacity
            style={[
            styles.button,
            {
                borderRadius: 30,
                backgroundColor: COLORS.RED,
                marginRight: 10
            },
            ]}
            onPress={() => closeAll()}
            >
              <Text style={styles.h3}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
              styles.button,
              {
                  borderRadius: 30,
                  backgroundColor: COLORS.LIGHT_BLUE,
                  marginLeft: 10
              },
              ]}
              onPress={() => recordModalNext()}
            >
              <Text style={styles.h3}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
          <Text style={[styles.h3, { paddingBottom: 20, marginTop: 20 }]}>
            Import
          </Text>
          <Text style={styles.body}>
            Tap the Import File to open your device's file selector.
            Choose the file you want to listen to.
            The audio you selected will be adjusted in the app!
          </Text>

          <View style={[styles.row, { justifyContent: "space-around" }]}>
            <TouchableOpacity
            style={[
            styles.button,
            {
                borderRadius: 30,
                backgroundColor: COLORS.RED,
                marginRight: 10
            },
            ]}
            onPress={() => closeAll()}
            >
              <Text style={styles.h3}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
              styles.button,
              {
                  borderRadius: 30,
                  backgroundColor: COLORS.LIGHT_BLUE,
                  marginLeft: 10
              },
              ]}
              onPress={() => importModalNext()}
            >
              <Text style={styles.h3}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={isRecordModalVisible}
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
          <Text style={[styles.h3, { paddingBottom: 20, marginTop: 20 }]}>
            Using the Player
          </Text>
          <Text style={styles.body}>
            Use our built-in audio player to listen to adjusted audio!
            Use the Play, Pause, and Stop buttons to control the audio playback.
            Use the Replay button to start the audio from the beginning.
          </Text>

          <View style={[styles.row, { justifyContent: "space-around" }]}>
            <TouchableOpacity
            style={[
            styles.button,
            {
                borderRadius: 30,
                backgroundColor: COLORS.RED,
            },
            ]}
            onPress={() => closeAll()}
            >
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={[styles.h1, styles.marginTop, styles.center]}>
        Audible Frequency
      </Text>

      <View style={[styles.margin, styles.row]}>
        <View
          style={{
            backgroundColor: COLORS.GREY,
            width: 50,
            height: 25,
          }}
        />
        <View
          style={{
            backgroundColor: COLORS.LIGHT_BLUE,
            width: 200,
            height: 25,
          }}
        />
        <View
          style={{
            backgroundColor: COLORS.GREY,
            width: 50,
            height: 25,
          }}
        />
      </View>
      <View
        style={[styles.margin, styles.row, { justifyContent: "space-between" }]}
      >
        <Text>{minFreq} Hz</Text>
        <Text>{maxFreq} Hz</Text>
      </View>

      {/* <Text>Select the mode here</Text>
      <SwitchSelector
        options={[
          { label: "Auto", value: "A" },
          { label: "Manual", value: "M" },
        ]}
        initial={0}
        onPress={(value) => console.log("SwitchSelector")}
        buttonColor={COLORS.LIGHT_BLUE}
        backgroundColor={COLORS.WHITE}
        animationDuration={300}
        fontSize={20}
        textStyle={{ color: COLORS.GREY }}
        selectedTextStyle={{ color: COLORS.BLACK }}
        style={styles.margin}
      />
      <Slider
        style={[styles.slider, styles.margin]}
        minimumValue={50}
        maximumValue={5000}
        minimumTrackTintColor={COLORS.MEDIUM_BLUE}
        maximumTrackTintColor={COLORS.GREY}
        value={3000}
        onValueChange={setMaxFrequency}
        step={1}
      /> */}

      <View style={[styles.center, styles.margin, styles.marginTop]}>
        <SoundPlayer getShiftedURI={this.getShiftedURI} />
      </View>

      <View style={[styles.row, styles.bottomButtons, styles.margin]}>
        <RecordAndPlayback changeShiftedURI={this.changeShiftedURI} />

        <ImportFile />
      </View>

      <StatusBar style="auto" />

      <TutorialButton tutorial={() => openTutorial()} />
    </View>
  );
}

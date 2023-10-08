import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity, Alert, useWindowDimensions} from 'react-native';
import SoundPlayer from './TesterPlayer';
// import ProgressBar from "react-native-progress/Bar";
// import SemiCircleProgressBar from "react-progressbar-semicircle";
import styles from '../Style/styles.js';
import { COLORS } from '../Style/colorScheme.js';

// This is the main view for the Frequency Tester
// First time users should be directed to this view first
// <SemiCircleProgressBar percentage={33} showPercentValue />
// <Progress.Bar progress={0.1} width={200} />
export default function FrequencyTester() {
  const navigation = useNavigation();
  const windowHeight = useWindowDimensions().height;

  const testerTutorialPage = () => {
    Alert.alert("tutorial page to be implemented");
  }

  return (
    <View style={{height: {windowHeight}, flex: 1}}>
      <View style={[styles.center, { alignSelf: 'center', width: 230, height: 230, borderRadius: 115, borderColor: COLORS.GREY, borderWidth: 5, marginTop: 50 }]}>
        <Text style={{ fontSize: 52, marginTop: 80, }}>
          20 Hz
        </Text>
      </View>

      <View style={[styles.center, styles.margin]}>
        <SoundPlayer mp3={require('../audio/audiosweep.mp3')} />
      </View>      

      <Text style={styles.h1}>
          Can you hear this sound?
      </Text>

      <View style={[styles.row, styles.margin, {justifyContent: 'space-evenly'}]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate("FrequencyTesterPhase");
        }}>
          <Image
            source={require('../images/thumbsup.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate("FrequencyTesterPhase");
        }}>
          <Image 
            onPress={() => navigation.navigate("FrequencyTesterPhase")}
            source={require('../images/thumbsdown.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={testerTutorialPage}
        style={[styles.circleButton, styles.corner]}>
        <Image
          source={require('../images/tutorial.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

// source: https://stackoverflow.com/questions/55537889/implemtation-of-audio-progress-bar-in-react-native
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Slider from "@react-native-community/slider";
import { COLORS, APP_THEME } from "../../Style/colorScheme";
import styles from "../../Style/styles";

function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => ([
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
]);

const SeekBar = ({
  trackLength,
  currentPosition,
  onSeek,
  onSlidingStart
}) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  return (
    <View style={seekbarStyle.container}>
      <View style={ styles.row }>
        <Text style={[styles.body, styles.center]}>
          {elapsed[0] + ":" + elapsed[1]}
        </Text>
        <View style={{ flex: 1 }} />
        <Text style={[styles.body,, styles.center]}>
          {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
        </Text>
      </View>
      <Slider
        maximumValue={trackLength}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        onValueChange={onSeek}
        value={currentPosition}
        minimumTrackTintColor={COLORS.MEDIUM_BLUE}
        maximumTrackTintColor={COLORS.GREY}
        style={[{height: 50}, styles.margin]}
      />
    </View>
  );
};

export default SeekBar;

const seekbarStyle = StyleSheet.create({
  slider: {
    marginTop: -12,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: APP_THEME.APP_BLUE,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign: 'center',
  }
});

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { APP_THEME } from "../Style/colorScheme";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import styles from "../Style/styles";

// This is the page first-time users should see when opening the app
export default function FrequencyTester() {
  const navigation = useNavigation();
  const windowHeight = useWindowDimensions().height;

  return (
    <SafeAreaView style={{ height: { windowHeight }, flex: 1, justifyContent: "space-around" }}>
      <View>
        <Image
          source={require("../images/logo.png")}
          style={{
            width: 150,
            height: 150,
            marginTop: 30,
            alignSelf: "center",
          }}
        />
        <Text style={[styles.center, styles.h1]}>
          {" "}
          Welcome to FrequencEase!{" "}
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={[styles.body, { marginLeft: 20, marginRight: 20 }]}>
          This app is designed to work like a hearing aid!{"\n"} {"\n"}
          First, we will find your frequency hearing range in the Frequency
          Tester. {"\n"} {"\n"}
          After completing the frequency test, you will be taken to our
          Frequency Adjuster page, where the app will adjust sounds real-time,
          or you can upload or record audios to have their frequencies adjusted
          as well.{"\n"} {"\n"}
          If you ever need more instructions for a page, there will be a
          question mark button in the bottom right corner of your screen you can
          click for a tutorial.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("FrequencyTester");
        }}
        style={{
          backgroundColor: APP_THEME.APP_BLUE,
          width: 200,
          height: 80,
          borderRadius: 50,
          marginTop: 40,
          marginBottom: 30,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Text style={[styles.h2, styles.center]}>
          {" "}
          Get started!{" "}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

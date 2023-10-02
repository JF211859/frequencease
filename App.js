import "react-native-gesture-handler";
import FrequencyAdjuster from "./Components/FrequencyAdjuster";
import FrequencyTester from "./Components/FrequencyTester";
import Settings from "./Components/Settings";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={"Home"}
        screenOptions={{
          headerStyle: { backgroundColor: "transparent" },
          headerTitleStyle: {
            fontSize: 25,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={FrequencyAdjuster}
          options={{ headerTitle: "Frequency Adjuster" }}
        />
        <Drawer.Screen name="Frequency Tester" component={FrequencyTester} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

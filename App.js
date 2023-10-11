import "react-native-gesture-handler";
import FrequencyAdjuster from "./Components/FrequencyAdjuster";
import FrequencyTester from "./Components/FrequencyTester/FrequencyTester";
import FrequencyTesterConfirmation from "./Components/FrequencyTester/FrequencyTesterConfirmation";
import FrequencyTesterPhase from "./Components/FrequencyTester/FrequencyTesterPhase";
import BackButtonImage from "./Components/ImageComponents/BackButton";
import HamburgerIcon from "./Components/ImageComponents/HamburgerIcon";
import Settings from "./Components/Settings";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "./Style/colorScheme";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Nested Stack Navigator for Frequency Tester Views
function FrequencyTesterStack() {
  return (
    <Stack.Navigator
      initialRouteName="FrequencyTester"
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTitleStyle: {
          fontSize: 25,
        },
      }}
    >
      <Stack.Screen
        name="FrequencyTester"
        component={FrequencyTester}
        options={{
          headerLeft: HamburgerIcon,
          headerTitle: "Frequency Tester",
        }}
        initialParams={{ phase: 1 }}
      />
      <Stack.Screen
        name="FrequencyTesterPhase"
        component={FrequencyTesterPhase}
        options={{
          headerBackTitleVisible: false,
          headerBackImage: BackButtonImage,
          headerTintColor: COLORS.BLACK,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="FrequencyTesterConfirmation"
        component={FrequencyTesterConfirmation}
        options={{
          headerTintColor: COLORS.BLACK,
          headerBackVisible: false,
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}

// Entire App's Navigation Container
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
          options={{
            headerTitle: "Frequency Adjuster",
            headerLeft: HamburgerIcon,
            headerLeftContainerStyle: { paddingLeft: 20 },
          }}
        />
        <Drawer.Screen
          name="Frequency Tester"
          component={FrequencyTesterStack}
          options={{ headerShown: false }} // stack has its own headers
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            headerLeft: HamburgerIcon,
            headerLeftContainerStyle: { paddingLeft: 20 },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

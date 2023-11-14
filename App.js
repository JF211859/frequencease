import "react-native-gesture-handler";
import FrequencyAdjuster from "./Components/FrequencyAdjuster/FrequencyAdjuster";
import FrequencyTester from "./Components/FrequencyTester/FrequencyTester";
import FrequencyTesterPhase from "./Components/FrequencyTester/FrequencyTesterPhase";
import BackButtonImage from "./Components/ImageComponents/BackButton";
import HamburgerIcon from "./Components/ImageComponents/HamburgerIcon";
import Profile from "./Components/Profile";
import WelcomePage from "./Components/WelcomePage";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { APP_THEME } from "./Style/colorScheme";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Nested Stack Navigator for Profile/ Frequency Tester Views
function ProfileTesterStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome Page"
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTitleStyle: {
          fontSize: 25,
        },
      }}
    >
      {/* Only loads on first launch/ reload app */}
      <Stack.Screen
        name="Welcome Page"
        component={WelcomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerLeft: HamburgerIcon,
          headerTitle: "Profile",
          gestureEnabled: false, //disable back
        }}
      />
      <Stack.Screen
        name="FrequencyTester"
        component={FrequencyTester}
        options={{
          headerBackVisible: false,
          headerTintColor: APP_THEME.TEXT_STANDARD,
          headerBackImage: BackButtonImage,
          headerTitle: "Frequency Tester",
          gestureEnabled: false, //disable back
        }}
        initialParams={{ phase: 0 }}
      />
      <Stack.Screen
        name="FrequencyTesterPhase"
        component={FrequencyTesterPhase}
        options={{
          headerTintColor: APP_THEME.TEXT_STANDARD,
          headerBackVisible: false,
          headerTitle: "",
          gestureEnabled: false, //disable back
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
        initialRouteName={"User Profile"}
        screenOptions={{
          headerStyle: { backgroundColor: "transparent" },
          headerTitleStyle: {
            fontSize: 24,
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
            drawerLabelStyle: { fontSize: 24 },
          }}
        />
        <Drawer.Screen
          name="User Profile"
          component={ProfileTesterStack}
          options={{
            headerShown: false,
            drawerLabelStyle: { fontSize: 24 },
            swipeEnabled: false, //disable swiping to navigation menu
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

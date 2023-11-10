import "react-native-gesture-handler";
import FrequencyAdjuster from "./Components/FrequencyAdjuster/FrequencyAdjuster";
import FrequencyTester from "./Components/FrequencyTester/FrequencyTester";
import FrequencyTesterConfirmation from "./Components/FrequencyTester/FrequencyTesterConfirmation";
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

// Nested Stack Navigator for Frequency Tester Views
function FrequencyTesterStack() {
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
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerLeft: HamburgerIcon,
          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="FrequencyTester"
        component={FrequencyTester}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: APP_THEME.TEXT_STANDARD,
          headerBackImage: BackButtonImage,
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
          headerTintColor: APP_THEME.TEXT_STANDARD,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="FrequencyTesterConfirmation"
        component={FrequencyTesterConfirmation}
        options={{
          headerTintColor: APP_THEME.TEXT_STANDARD,
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
            drawerLabelStyle: { fontSize: 24 }
          }}
        />
        <Drawer.Screen
          name="User Profile"
          component={FrequencyTesterStack}
          options={{ 
            headerShown: false,
            drawerLabelStyle: { fontSize: 24 }
          }} // stack has its own headers
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

import { StyleSheet } from "react-native";
import { useTheme } from "../Style/ThemeContext";

const dynamicStyles = () => {
  const { getAppTheme } = useTheme();
  const appTheme = getAppTheme();

  return StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: "center",
    },
    h1: {
      fontSize: 32,
    },
    h2: {
      fontSize: 24,
    },
    marginTop: {
      marginTop: 32,
    },
    h3: {
      fontSize: 20,
    },
    body: {
      fontSize: 18,
    },
    button: {
      backgroundColor: appTheme.APP_BLUE,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
    circleButton: {
      backgroundColor: appTheme.APP_BLUE,
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 100,
      height: 70,
      width: 70,
      margin: 15,
    },
    icon: {
      height: 55,
      width: 55,
    },
    row: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    bottomButtons: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    slider: {
      height: 100,
    },
    margin: {
      marginTop: 10,
      marginLeft: 15,
      marginRight: 15,
    },
    center: {
      alignItems: "center",
      textAlign: "center",
    },
    hide: {
      display: "none",
    },
    corner: {
      alignSelf: "flex-end",
      position: "absolute",
      bottom: 15,
      right: 15,
    },
    phaseContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 55,
      marginVertical: 5,
    },
  });
};

export default dynamicStyles;

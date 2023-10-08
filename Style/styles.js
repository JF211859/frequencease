import { StyleSheet } from "react-native";
import { APP_THEME } from "../Style/colorScheme";

export default StyleSheet.create({
    h1: {
      fontSize: 32,
      marginTop: 32,
      textAlign: "center",
    },
    h2: {
      fontSize: 24,
      marginTop: 32,
      textAlign: "center",
    },
    body: {
      fontSize: 16
    },
    button: {
      backgroundColor: APP_THEME.APP_BLUE,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
    circleButton: {
      backgroundColor: APP_THEME.APP_BLUE,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 100,
      height: 70,
      width: 70,
      margin: 15
    },
    icon: {
      height: 55,
      width: 55
    },
    row: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    fileButtons: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    slider: {
      height: 100,
    },
    margin: {
      marginTop: 10,
      marginLeft: 15,
      marginRight: 15
    },
    center: {
      alignItems: 'center'
    },
    hide: {
      display: 'none'
    },
    corner: {
      alignSelf: 'flex-end',
      position: 'absolute',
      bottom: 0
    }
})
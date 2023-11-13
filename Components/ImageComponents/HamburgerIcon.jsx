import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Alert, Image, View } from "react-native";
import hamburgerIcon from "../../images/hamburger_icon.png";
import styles from "../../Style/styles.js";

// clickable hamburger icon to add to header menu
export default function HamburgerIcon() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Image source={hamburgerIcon} style={[styles.icon, {marginRight: 1}]} />
    </TouchableOpacity>
  );
}

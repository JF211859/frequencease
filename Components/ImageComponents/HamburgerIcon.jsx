import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Alert, Image, View } from "react-native";
import hamburgerIcon from "../../images/hamburger_icon.png";
import hamburgerIconDark from "../../images/hamburger_icon_dark.png";
import { useTheme } from "../../Style/ThemeContext";

import dynamicStyles from "../../Style/styles.js";

// clickable hamburger icon to add to header menu
const HamburgerIcon = () => {
  const styles = dynamicStyles();

  const navigation = useNavigation();
  const { getIsDarkMode } = useTheme();

  const renderHamburgerIcon = () => {
    return (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          source={getIsDarkMode() ? hamburgerIconDark : hamburgerIcon}
          style={[styles.icon, { marginRight: 1 }]}
        />
      </TouchableOpacity>
    );
  };

  return <>{renderHamburgerIcon()}</>;
};

export default HamburgerIcon;

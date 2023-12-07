import React from "react";
import { Image } from "react-native";
import back from "../../images/back_button.png";
import backDark from "../../images/back_dark.png";

import { useTheme } from "../../Style/ThemeContext";

// back button icon for header
const BackButtonImage = () => {
  const { getIsDarkMode } = useTheme();

  const renderBackIcon = () => {
    return (
      <Image
        source={getIsDarkMode() ? backDark : back}
        style={{ height: 32, width: 32, marginLeft: 10, tintColor: "" }}
        accessibilityLabel="Back"
        accessibilityHint="Navigate to the previous page"
        accessibilityRole="imagebutton"
      />
    );
  };

  return <>{renderBackIcon()}</>;
};

export default BackButtonImage;

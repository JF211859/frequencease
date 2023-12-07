import React from "react";
import { Image, TouchableOpacity } from "react-native";
import tutorialIcon from "../../images/tutorial.png";
import tutorialIconDark from "../../images/question_dark.png";
import dynamicStyles from "../../Style/styles";
import { useTheme } from "../../Style/ThemeContext";

const TutorialButton = ({ tutorial }) => {
  const styles = dynamicStyles();
  const { getIsDarkMode } = useTheme();

  const renderTutorialIcon = () => {
    return (
      <TouchableOpacity
        onPress={tutorial}
        style={[styles.circleButton, styles.corner]}
      >
        <Image
          source={getIsDarkMode() ? tutorialIconDark : tutorialIcon}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  };

  return <>{renderTutorialIcon()}</>;
};
export default TutorialButton;

import React from "react";
import { Image } from "react-native";
import backChevron from "../../images/back_button.png";

// back button icon for header
const BackButtonImage = () => (
  <Image
    source={backChevron}
    style={{ height: 32, width: 32, marginLeft: 10, tintColor: "" }}
    accessibilityLabel="Back"
    accessibilityHint="Navigate to the previous page"
    accessibilityRole="imagebutton"
  />
);

export default BackButtonImage;
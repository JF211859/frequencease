import AsyncStorage from "@react-native-async-storage/async-storage";
export const USERNAME_KEY = "UserName";
export const MINFREQ_KEY = "MinFrequency";
export const MAXFREQ_KEY = "MaxFrequency";

//e.g. saveName("Chesney")
export const saveName = async (user_name) => {
  try {
    await AsyncStorage.setItem(USERNAME_KEY, user_name);
    alert("Data successfully saved");
  } catch (e) {
    alert("Failed to save the data to the storage");
  }
};

// Note: AsyncStorage prevents storing non-string values so we will store the frequencies as strings
// e.g. saveLowestFreq(200)
export const saveLowestFreq = async (min_freq) => {
  try {
    await AsyncStorage.setItem(MINFREQ_KEY, min_freq);
    alert("Data successfully saved");
  } catch (e) {
    console.log(e);
    alert("Failed to save the data to the storage");
  }
};

export const saveHighestFreq = async (max_freq) => {
  try {
    await AsyncStorage.setItem(MAXFREQ_KEY, max_freq);
    alert("Data successfully saved");
  } catch (e) {
    alert("Failed to save the data to the storage");
  }
};

export const readData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;

    // Do we need this? if key doesn't exist, it returns null?
    // if (value !== null) {
    //   setInput(value);
    // }
  } catch (e) {
    alert("Failed to fetch the input from storage");
  }
};

export const onChangeText = (value) => setInput(value);

export const onSubmitEditing = () => {
  if (!input) return;

  saveData(input);
  setInput("");
};

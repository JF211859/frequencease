import AsyncStorage from '@react-native-async-storage/async-storage';

const saveName = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, user_name)
    alert('Data successfully saved')
  } catch (e) {
    alert('Failed to save the data to the storage')
  }
}

const saveLowestFreq = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, lowest_freq)
    alert('Data successfully saved')
  } catch (e) {
    alert('Failed to save the data to the storage')
  }
}

const savHighestFreq = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, highest_freq)
    alert('Data successfully saved')
  } catch (e) {
    alert('Failed to save the data to the storage')
  }
}

const readData = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);

  if (value !== null) {
    setInput(value);
  }
  } catch (e) {
    alert('Failed to fetch the input from storage');
  }
};

const onChangeText = value => setInput(value);

const onSubmitEditing = () => {
  if (!input) return;

  saveData(input);
  setInput('');
};
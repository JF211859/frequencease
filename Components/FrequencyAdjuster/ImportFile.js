import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import styles from "../../Style/styles";

export default function ImportFile() {
  async function uploadFile() {
    const data = new FormData();
    data.append('file', {
      name: file.name,
      type: file.type,
      uri: Platform.OS === 'ios' ? 
          file.uri.replace('file://', '')
          : file.uri,
    });

    await fetch("https://frequenceaseapi-3k7cjdpwya-uc.a.run.app/adjuster?shift=5000", {
      method: "post",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data; ",
      },
    });
  }

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={uploadFile}>
        <Text style={styles.body}> Import File </Text>
      </TouchableOpacity>
    </View>
  );
}
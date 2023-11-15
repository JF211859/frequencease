const [isRecordModalVisible, setRecordModalVisible] = React.useState(false);
const [isImportModalVisible, setImportModalVisible] = React.useState(false);
const [isPlayerModalVisible, setPlayerModalVisible] = React.useState(false);

const recordModalNext = () => {
    setRecordModalVisible(false);
    setImportModalVisible(true);
};
const importModalNext = () => {
    setImportModalVisible(false);
    setPlayerModalVisible(true);
};
const closeAll = () => {
    setRecordModalVisible(false);
    setImportModalVisible(false);
    setPlayerModalVisible(false);
}

<View>
<Modal
isVisible={isRecordModalVisible}
style={styles.center}
backdropOpacity={0.8}
>
<View
    style={[
    styles.center,
    {
        width: 300,
        height: 600,
        backgroundColor: "white",
        borderRadius: 30,
        padding: 20,
    },
    ]}
>
    <Text style={[styles.h3, { paddingBottom: 20, marginTop: 20 }]}>
        Record
    </Text>
    <Text style={[styles.body, { marginTop: 20 }]}>
        Tap the Record button to start recording.{"\n"} {"\n"}
        When you are done recording, tap the button{"\n"} {"\n"}
        again to stop recording. The audio {"\n"} {"\n"}
        you recorded will be adjusted in the app!
    </Text>

    <View style={[styles.row, { justifyContent: "space-around" }]}>
        <TouchableOpacity
            style={[
            styles.button,
            {
                borderRadius: 30,
                backgroundColor: COLORS.LIGHT_BLUE,
            },
            ]}
            onPress={() => recordModalNext()}
        >
            <Text style={styles.h3}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[
            styles.button,
            {
                borderRadius: 30,
                backgroundColor: COLORS.RED,
            },
            ]}
            onPress={() => closeAll()}
        >
            <Text style={styles.h3}>Close</Text>
        </TouchableOpacity>
    </View>
</View>
</Modal>

<Modal
isVisible={isModalVisible}
style={styles.center}
backdropOpacity={0.8}
>
<Text style={[styles.h3, { paddingBottom: 20, marginTop: 20 }]}>
        Import File
    </Text>
    <Text style={[styles.body, { marginTop: 20 }]}>
        Tap the Import File to open your device's file selector.{"\n"} {"\n"}
        Choose the file you want to listen to.{"\n"} {"\n"}
        The audio you selected will be adjusted in the app!
    </Text>

    <View style={[styles.row, { justifyContent: "space-around" }]}>
        <TouchableOpacity
            style={[
            styles.button,
            {
                borderRadius: 30,
                backgroundColor: COLORS.LIGHT_BLUE,
            },
            ]}
            onPress={() => importModalNext()}
        >
            <Text style={styles.h3}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[
            styles.button,
            {
                borderRadius: 30,
                backgroundColor: COLORS.RED,
            },
            ]}
            onPress={() => closeAll()}
        >
            <Text style={styles.h3}>Close</Text>
        </TouchableOpacity>
    </View>
</Modal>

<Modal
isVisible={isModalVisible}
style={styles.center}
backdropOpacity={0.8}
>
    <Text style={[styles.h3, { paddingBottom: 20, marginTop: 20 }]}>
        Listening to files
    </Text>
    <Text style={[styles.body, { marginTop: 20 }]}>
        Use our built-in audio player to listen to adjusted audio.{"\n"} {"\n"}
        Use the Play, Pause, and Stop buttons to start and stop the{"\n"} {"\n"}
        audio as needed. Use the Replay button to start the audio from{"\n"} {"\n"}
        the beginning.
    </Text>

    <View style={[styles.row, { justifyContent: "space-around" }]}>
        <TouchableOpacity
            style={[
            styles.button,
            {
                borderRadius: 30,
                backgroundColor: COLORS.RED,
            },
            ]}
            onPress={() => closeAll()}
        >
            <Text style={styles.h3}>Close</Text>
        </TouchableOpacity>
    </View>
</Modal>
</View>
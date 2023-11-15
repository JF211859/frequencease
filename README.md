# FrequencEase

## [BACKEND CODE] Frequency Adjustment API
[Frequency Adjustment API GitHub](https://github.com/JF211859/frequenceaseapi)  
Note: Our app is currently iOS-only as the backend is not compatible with Android.

## Note for Testing the App
* The first file upload for the "Import File" button does not work, but all others after should
* Audio for "Record" and "Import File" buttons may come from the phone's top speaker and not the bottom ones
* Press replay or stop after recording/uploading a new audio for it to play correctly

## Setup
Clone this repository to your local machine

	git clone https://github.com/JF211859/frequencease.git

Install **Expo** on Computer: 
	
 	npm install -g expo-cli

Install **Expo Go App** on your mobile device ([iOS](https://apps.apple.com/us/app/expo-go/id982107779), [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US&pli=1))

## Open Directory
Install Yarn: 

	npm install --global yarn

Change directory to the project folder:
	
 	cd frequencease

Install Project Dependencies:

	npm install

## Running the App
Start the Development Server 
	
 	npx expo start



See App on Device:

* iOS: open the default "Camera" app and scan QR code you see in the terminal.
* Android: press "Scan QR Code" on the "Projects" tab of the Expo Go app and scan the QR code.

## Resources
[Expo Documentation](https://docs.expo.dev/index.html)


[React Native Documentation](https://reactnative.dev/docs/getting-started)

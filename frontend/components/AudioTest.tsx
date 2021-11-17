import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';


export default function AudioTest() {
  const [recording, setRecording] = React.useState();
  const [recordingList,setRecordingList] =React.useState([]);


//   const addToRecordings=(songLocation)=>{
//       recordingList.push(
//           <Button
//             title='song'
//             onPress={playOrPause}
//             ></Button>
//       )
//   }

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
    // new Audio(uri).play()
    let list =[...recordingList]
    list.push(uri)
    setRecordingList(list)



    // const sound = new Audio.Sound()
    // await sound.loadAsync({uri})
    // await sound.playAsync()
  }

  const playOrPause= async (uri)=>{
    const sound = new Audio.Sound()
    await sound.loadAsync({uri})
    await sound.playAsync()
  }

  return (
    // <View style={styles.container}>
    <View>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {recordingList.map(uri=><Button onPress={()=>playOrPause(uri)} title={uri}/>)}
    </View>
  );
}

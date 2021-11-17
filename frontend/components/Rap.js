//import { React.useEffect, React.useState } from 'react'
import * as React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios'
// import './App.css';

const Dictaphone = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    let [loading, setLoading] = React.useState(false)
    let [song, setSong] = React.useState('')
    const [rhymes, setRhymes] = React.useState([])



    React.useEffect(async () => {
        console.log(transcript, listening)
        let tArr = transcript.split(' ')
        let word = tArr[tArr.length - 1]


        console.log(`serach for ${word}`)

        // setSong(song += ' ' + transcript)

        // (async function () {
        setLoading(true)
        //let res = await axios.get(`https://rhymebrain.com/talk?function=getRhymes&word=${word}&maxResults=10`)
        //let res = await axios.get(`https://wordsapiv1.p.mashape.com/words/${word}/rhymes`)

        let res = await axios.get(`https://api.datamuse.com/words?rel_rhy=${word}&max=10`)

        console.log(res.data)
        setLoading(false)
        setRhymes(res.data)
        // })()
        console.log(SpeechRecognition, SpeechRecognition.listening)

    }, [transcript])


    React.useEffect(() => {
        console.log("I am listening ", listening)
        if (!listening) {
            SpeechRecognition.startListening()
            setSong(song += transcript + '<br />')
        }
    }, [listening])

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const showSong = () => {
        return { __html: song };
    }

    const showRhymes = () => rhymes.map(rhyme => <li key={rhyme.word}>{rhyme.word}</li>)

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={() => SpeechRecognition.startListening()}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={() => { resetTranscript(); setSong('') }}>Reset</button>
            <p>Transcript: {transcript}</p>


            <p dangerouslySetInnerHTML={showSong()}></p>

            <ul>
                {loading ? 'Loading...' : showRhymes()}
            </ul>
        </div>
    );
};
export default Dictaphone;


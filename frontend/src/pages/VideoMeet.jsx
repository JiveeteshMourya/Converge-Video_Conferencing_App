import React, { useRef, useState, useEffect } from "react";
import "../styles/videoComponent.css";
import { Badge, IconButton, TextField, Button } from '@mui/material';

const server_url = "http://localhost:8000";

let connections = {};
const peerConfigConnections = {
    "iceServers": [
        {"urls": "stun:stun.l.google.com:19302"}
    ]
}

export default function VideoMeetComponent() {
    let socketRef = useRef();
    let socketIdRef = useRef();
    
    let localVideoRef = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);
    let [video, setVideo] = useState();
    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();
    let [screenAvailable, setScreenAvailable] = useState();

    let [showModal, setShowModal] = useState();

    let [messages, setMessages] = useState([]);
    let [message, setMessage] = useState("");
    let [newMessages, setNewMessages] = useState(0);

    let [askForUsername, setAskForUsername] = useState(true);
    let [username, setUsername] = useState("");

    const videoRef = useRef([]);

    let [videos, setVideos] = useState([]);

    // if(isChrome() == false) {

    // } // what is chromium?

    const getPermissions = async() => {
        try{
            const videoPermission = await navigator.mediaDevices.getUserMedia({video: true});
            if(videoPermission) {
                setVideoAvailable(true);
            } else {
                setVideoAvailable(false);
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({audio: true});
            if(audioPermission) {
                setAudioAvailable(true);
            } else {
                setAudioAvailable(false);
            }

            if(navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            if(videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({video: videoAvailable, audio: audioAvailable});
                if(userMediaStream) {
                    window.localSream = userMediaStream;
                    if(localVideoRef.current) {
                        localVideoRef.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPermissions();
    }, []);

    let getUserMediaSuccess = (stream) => {
        
    }

    let getUserMedia = () => {
        if((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({video: video, audio: audio})
                .then(() => {}) // DIY: getUserMediaSuccess
                .then((stream) => {})
                .catch((e) => console.log(e))
        } else {
            try{
                let tracks = localVideoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            } catch(e) {

            }
        }
    }

    useEffect(() => {
        if(video !== undefined && audio !== undefined) {
            getUserMedia();
        }
    }, [audio, video]);

    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    }

    return (
        <div>
            {askForUsername == true ?
                <div>
                    <h2>Enter into Lobby</h2>
                    <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
                    <Button variant="contained" onClick={connect}>Connect</Button>

                    <div>
                        <video ref={localVideoRef} autoPlay muted></video>
                    </div>
                </div> : <></>
        
            }
        </div>
    )
}
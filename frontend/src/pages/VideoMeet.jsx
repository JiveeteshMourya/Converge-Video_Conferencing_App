import React, { useRef, useState } from "react";
import "../styles/videoComponent.css";

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
    let [audioAvailable, serAudioAvailable] = useState(true);
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

    return (
        <div>VideoMeetComponent {window.location.href}</div>
    )
}
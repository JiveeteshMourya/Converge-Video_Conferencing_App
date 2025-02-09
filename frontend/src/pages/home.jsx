import { useNavigate } from "react-router-dom";
import withAuth from "../utils/withAuth";
import { useContext, useState } from "react";
import "../App.css";
import RestoreIcon from "@mui/icons-material/Restore";
import { Button, IconButton, TextField } from '@mui/material';
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const {addToUserHistory} = useContext(AuthContext);
    let handleJoinVideoCall = async() => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`)
    }
    return (<>
        <div className="navBar">
            <div style={{display: "flex", alignItems: "center"}}>
                <h2>Converge</h2>
            </div>
            <div style={{display:"flex", alignItems: "center"}}>
                <IconButton onClick={() => {navigate("/history")}} id="history">
                    <RestoreIcon/>
                </IconButton>
                <label for="history">History</label>
                &nbsp;&nbsp;
                <Button onClick={() => {localStorage.removeItem("token"); navigate("/")}}>
                    Logout
                </Button>
            </div>
        </div>
        <div className="meetContainer">
            <div className="leftPanel">
                <div>
                    <h2>Delivering High-Quality Video Call Experiences.</h2>
                    <div style={{display: "flex", gap: "10px"}}>
                        <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined"/>
                        <Button onClick={handleJoinVideoCall} variant="contained">Join</Button>
                    </div>
                </div>
            </div>
            <div className="rightPanel">
                <img srcSet="/logo3.png" alt="respectiveImg"/>
            </div>
        </div>
    </>)
}

export default withAuth(HomeComponent);
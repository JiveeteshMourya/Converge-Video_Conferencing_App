import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

const start = async () => {
    const connectDB = await mongoose.connect("mongodb+srv://jcodestudy:4AifrqpWEknGLdPM@converge.as5x4.mongodb.net/video_conferencing_app?retryWrites=true&w=majority&appName=Converge")
    console.log(`Mongo connected to host: ${connectDB.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log(`Server listening on port: ${app.get("port")}`);
    });
}
start();

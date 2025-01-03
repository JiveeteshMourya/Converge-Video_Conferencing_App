import { Server } from "socket.io";

let connections = {}
let messages = {}
let timeOnline = {}

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // * maane, from everywhere. but only in dev, don't use in production
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        socket.on("join-call", (path) => {
            if(connections[path] === undefined) {
                connections[path] = [];
            }
            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();
            
            for(let a = 0; a<connections[path].length; i++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]);
            }
            // can also use
                // connections[path].forEach(el => {
                //     io.to(el).emit("user-joined", socket.id, connections[path]);
                // });

            if(messages[path] != undefined) {
                for(let a=0; a<messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'], 
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender']);
                }
            }
        });

        socket.on("signal", (told, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        socket.on("chat-message", (data, sender) => {
            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {
                    if(!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, isFound];
                }, ["", false]);
            
            if(found === true) {
                if(messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = [];
                }
                messages[matchingRoom].push({'sender': sender, "data": data, "socket-id-sender": socket.id});
                console.log("messages", Key, ":", sender, data);

                connections[matchingRoom].forEach((el) => {
                    io.to(el).emit("chat-message", data, sender, socket.id);
                });
            } 
        });

        socket.on("disconnect", () => {
            let diffTime = Math.abs(timeOnline[socket.id] - new Date());
            let key;
            for(const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
                // k=rooms, v=persons
                for(let a = 0; a<v.length; ++a) {
                    if(v[a] === socket.id) {
                        key = k; // key=currentRoomId
                        for(let a=0; a<connections[key].length; ++a) {
                            io.to(connections[key][a]).emit("user-left", socket.id);
                        }
                        let index = connections[key].indexOf(socket.id);
                        connections[key].splice(index, 1);
                        if(connections[key].length === 0) {
                            delete connections[key];
                        }
                    }
                }
            }
        });
    });

    return io;
}
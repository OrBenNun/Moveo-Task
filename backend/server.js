const { getQuestionByID, getAllQuestion } = require('./DBFunctions.js');
const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const server = http.createServer(app);
const cors = require('cors');

app.use(cors());

let mentor = {isMentor:false, socket:null}

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },
});

io.on('connection', (socket) =>{
    console.log(`User connected: ${socket.id}`);

    socket.on('identification', ()=>{
        if(mentor.isMentor === false){
            mentor.isMentor = true;
            mentor.socket = socket;
            const data = {isMentor:true};
            socket.emit('identification',data);
        } else {
            const data = {isMentor:false};
            socket.emit('identification',data);
        }
    })

    socket.join('study-room');

    socket.on('code-change', (data) => {
        socket.to('study-room').emit('code-change', data);
      });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        mentor.isMentor = false;
        mentor.socket = null;
    });
})

app.get('/codequestion/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await getQuestionByID(id);
    res.send(result);
});

app.get('/allcodequestion', async (req, res) => {
    const result = await getAllQuestion();
    res.send(result);
});

const PORT = 5000;

server.listen(PORT, () =>{
     console.log(`Server is running on port number: ${PORT}`);
})

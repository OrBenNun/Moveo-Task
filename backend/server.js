const { getQuestionByID, getAllQuestion } = require('./DBFunctions.js');
const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const server = http.createServer(app);
const cors = require('cors');

app.use(cors());

const PATH = 'https://live-study-session.onrender.com:3000';
const PORT = 5000;

// Boolean of saving the mentor access.
let mentor = {isMentor:false, socket:null}

const io = new Server(server, {
    cors: {
        origin: PATH,
        methods: ["GET","POST"],
    },
});


io.on('connection', (socket) =>{
    console.log(`User connected: ${socket.id}`);

    // Allocating a role.
    socket.on('identification', ()=>{
        if(mentor.isMentor === false){
            mentor.isMentor = true;
            mentor.socket = socket;
            const data = {isMentor:true};
            // Send the role back to the user.
            socket.emit('identification',data);
        } else {
            const data = {isMentor:false};
            // Send the role back to the user.
            socket.emit('identification',data);
        }
    })

    // Letting the user to join the socket's study room.
    socket.join('study-room');

    // Transfer the code-change between the socket room.
    socket.on('code-change', (data) => {
        socket.to('study-room').emit('code-change', data);
      });

    // Discconection case => checking if mentor left.
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        mentor.isMentor = false;
        mentor.socket = null;
    });
})

// Non socket data collecting => getting the question from the DB using ID.
app.get('/codequestion/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await getQuestionByID(id);
    res.send(result);
});

// Non socket data collecting => getting the entire questions from the DB.
app.get('/allcodequestion', async (req, res) => {
    const result = await getAllQuestion();
    res.send(result);
});

server.listen(PORT, () =>{
     console.log(`Server is running on port number: ${PORT}`);
})

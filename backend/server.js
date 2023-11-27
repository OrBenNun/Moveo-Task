// import  {getQuestionByID}  from './DBFunctions.js';
// parse = require('./DBFunctions');
// const { getQuestionByID } = require('./DBFunctions.js');

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
        console.log('got noty');
        if(mentor.isMentor === false){
            console.log('here')
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

        // const decipher = crypto.createDecipher('aes256', 'encryptionKey');
        // let decryptedMsg = decipher.update(encryptedMsg, 'hex', 'utf8');
        // decryptedMsg += decipher.final('utf8');
        socket.to('study-room').emit('code-change', data);
        // io.to('study-room').emit('message', decryptedMsg);
      });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        mentor.isMentor = false;
        mentor.socket = null;
        // Handle any cleanup or additional logic here
    });
})

app.get('/codequestion/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    // console.log(id);
    const result = await getQuestionByID(id);
    console.log(result);
    // console.log(param.id);
//   res.send('Hello, this is the /myPath route on your server!');
    res.send(result);
});

app.get('/allcodequestion', async (req, res) => {
    // console.log('here');
    const result = await getAllQuestion();
    // console.log(result);
    // console.log(param.id);
//   res.send('Hello, this is the /myPath route on your server!');
    res.send(result);
});

const PORT = 5000;

server.listen(PORT, () =>{
     console.log(`Server is running on port number: ${PORT}`);
})

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '\\index.html')
})

io.on('connection', (socket) => {
    socket.broadcast.emit("new user connected")
    socket.on('disconnect', () => {
        socket.broadcast.emit("user disconnected")
    })
    socket.on('chat message', (message) => {
        io.emit('chat message', message)
    })
})

http.listen(3000, () => {
    console.log('listening on *3000')
})
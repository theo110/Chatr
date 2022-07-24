const express = require("express")
const http = require("http")
const cors = require("cors")
const { addUser, removeUser, getUser, getAllUsers } = require("./utils")
const path = require("path")

const app = express()
app.set('port', (process.env.PORT || 5000))

var server = app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

app.use(express.static('client/dist'))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})


io.on("connection", socket => {
    socket.on("join", (data) => {
        const { name, room } = data
        const { user, error } = addUser({ id: socket.id, name, room })
        console.log(socket.id)
        console.log(room)
        if (error) return

        socket.emit("message", {
            user: "admin",
            text: `Welcome, ${user.name}`
        })

        socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name} has joined the room.`
        })

        socket.join(user.room)
        io.to(user.room).emit("room-data", {
            room: user.room,
            users: getAllUsers(user.room),
        })
    }),
        socket.on("disconnect", () => {
            const user = removeUser(socket.id)
            if (user) {
                io.to(user.room).emit("message", {
                    user: "admin",
                    text: `${user.name} has left the room.`,
                });
            }
        }),
        socket.on("connection", () => {
            const user = getUser(soccket.id)
            io.to(user.room).emit("message", {
                user: user.name,
                text: message
            })

            io.to(user.room).emit("room-data", {
                room: user.room,
                users: getAllUsers(user.room)
            })
        }),
        socket.on("send-message", async (message, callback) => {
            const user = await getUser(socket.id)
            try {
                io.to(user.room).emit("message", {
                    user: user.name,
                    text: message
                })
                io.to(user.room).emit("room-data", {
                    room: user.room,
                    users: getAllUsers(user.room)
                })
            } catch (e) {
                console.log(e)
            }
        })
})

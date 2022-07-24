import { useState, useEffect, createRef } from 'react'
import { Paper, Grid, Divider} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from "./chat.module.css";
import Toolbar from './toolbar/Toolbar';
import Info from "./info/Info"
import ChatWindow from './chat-window/ChatWindow';
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;

const theme = createTheme({
    palette: {
        primary: {
            main: '#5ab3f4',
            contrastText: '#F0FFFF'
        },
        secondary: {
            main: '#49e0f4',
            light: '#F0FFFF'
        },
    },
})

function Chat2(props) {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    const END_POINT = "https://chatr-troh.herokuapp.com";

    const messagesEnd = createRef()

    useEffect(() => {
        let { name, room } = queryString.parse(location.search)
        console.log(name)
        console.log(room)
        socket = io(END_POINT)
        setName(name)
        setRoom(room)
        socket.emit("join", { name, room })
        return () => {
            socket.emit("left");
            socket.off();
        };
    }, [END_POINT, location.search]
    )

    useEffect(() => {
        socket.on("message", message => {
            setMessages(messages => [...messages, message])
        })
        socket.on("room-data", ({ users }) => {
            setUsers(users);
        })
    }, []
    )

    useEffect(() => {
        scrollToBottom()
    }
    )


    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({
            block: "nearest",
            inline: "center",
            behavior: "smooth",
            alignToTop: false
        });
    }

    const sendMessage = (e) => {
        const messageInput = document.getElementById('message-input');
        e.preventDefault();
        if (message) {
            socket.emit("send-message", message)
            setMessage("");
        }
        messageInput.value = ""
    }

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Toolbar styles={styles}/>
                <Grid container component={Paper} className={styles.chatSection}>
                    <Divider></Divider>
                    <Info room={room} users={users} styles={styles}/>
                    <ChatWindow messages={messages} setMessage={setMessage} sendMessage={sendMessage} name={name} styles={styles} messagesEnd={messagesEnd}/>
                </Grid>
            </div>
        </ThemeProvider>
    )
}

export default Chat2;
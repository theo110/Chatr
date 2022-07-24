import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styles from "./form.module.css";
import { Typography, Box, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

function Form(props) {
    let navigate = useNavigate()
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const handleSubmit = (e) => {
        (!name || !room) ? e.preventDefault() : null
        navigate(`./chat?name=${name}&room=${room}`)
    }

    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.mainContainer}>
                <Typography component="main" variant="h2" color="primary" noWrap>Chatr</Typography>
                <Typography component="subtitle" variant="h5" color="secondary" noWrap>A simple chatroom webapp</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField margin="normal" fullWidth required label="Enter your name:" onChange={e => { setName(e.target.value) }} />
                    <TextField margin="normal" fullWidth required label="Enter a room id:" onChange={e => { setRoom(e.target.value) }} />
                    <Button
                        className={styles.sendButton}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Join
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Form;
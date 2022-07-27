import { Grid, TextField, Button } from '@mui/material';

function Actions({ styles, setMessage, sendMessage }) {
    return (
        <div className={styles.limiter}>
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={10}>
                    <TextField id="message-input" label="Send Your Message" fullWidth
                        onChange={e => { setMessage(e.target.value) }}
                        onKeyDown={e => e.key === "Enter" ? sendMessage(e) : null}
                    />
                </Grid>
                <Grid xs={0.5} align="right">
                </Grid>
                <Grid xs={1.5} align="right">
                    <Button
                        fullWidth
                        onClick={e => sendMessage(e)}
                        variant="contained"
                        color="primary"
                        className={styles.sendButton}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Actions
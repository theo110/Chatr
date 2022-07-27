import Messages from './message/Message'
import Actions from './actions/Actions'

import {Grid, List, Divider} from '@mui/material';

function ChatWindow({ messages, styles, setMessage, sendMessage, name, messagesEnd}) {
    return (
        <Grid item xs={9.5}>
            <List className={styles.messageArea}>
                {messages.map((message) => (
                    <Messages
                        styles={styles}
                        message={message}
                        name={name}
                    />
                ))}
                <div ref={messagesEnd}></div>
            </List>
            <Divider />
            <Actions setMessage={setMessage} sendMessage={sendMessage} styles={styles}/>
        </Grid>
    )
}

export default ChatWindow
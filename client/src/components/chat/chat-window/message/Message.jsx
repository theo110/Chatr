import { ListItem, Grid, ListItemText } from '@mui/material';

const Message = ({ message, name, styles }) => {
    let isSentByTheCurrentUser = false;
    let isSentByAdmin = false;

    const trimmedName = name.trim().toLowerCase();
    console.log(message, name);

    let firstLetter = ""

    if (message) {
        if (message.user === trimmedName) {
            isSentByTheCurrentUser = true;
        }
        if ("admin" == message.user) {
            isSentByAdmin = true;
        }
        firstLetter = (Array.from(message.user)[0]).toUpperCase()
        console.log(trimmedName)
        console.log(isSentByAdmin)

        return (
            <ListItem>
                <Grid container>
                    <Grid item xs={12}>
                        {!(isSentByTheCurrentUser || isSentByAdmin) && <div className={styles.nameLabel}>{message.user}</div>}
                        <div
                            className={`${styles.message} ${isSentByTheCurrentUser ? styles.sent : (isSentByAdmin ? styles.admin : styles.received)
                                }`}
                        >
                            <div className={styles.text}>
                                <span>{message.text}</span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </ListItem>
        )
    }
    return null;
};

export default Message
import { Typography, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';

function Info({ room, users, styles }) {
    return (
        <Grid item xs={3} className={styles.borderRight500}>
            <Grid item xs={12} >
                <ListItem>
                    <ListItemText disableTypography
                        primary={<Typography variant="h5" color='secondary'>Room {room}</Typography>}
                    />
                </ListItem>
            </Grid>
            <Divider />
            <List>
                {users.map((user) => (
                    <ListItem>
                        <ListItemText disableTypography
                            primary={<Typography color='primary'>{user.name}</Typography>}
                        />
                    </ListItem>
                ))}
            </List>
        </Grid>
    )
}

export default Info
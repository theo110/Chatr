import {Typography, Grid, Toolbar, AppBar, Button} from '@mui/material';

function Info({ styles }) {
    return (
        <Grid container>
        <AppBar position="absolute" color="primary" className={styles.hero}>
            <Toolbar className={styles.navRow}>
                <Typography component="h1" variant="h3" color="secondary.light" noWrap>
                    Chatr
                </Typography>
                <a style={{textDecoration: "none"}}href="/">
                    <Button
                        variant="contained"
                        color="secondary"
                    >
                        Leave Room
                    </Button>
                </a>
            </Toolbar>
        </AppBar>
    </Grid>
    )
}

export default Info
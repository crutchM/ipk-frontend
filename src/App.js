import './App.css';
import {Button, AppBar, Box, Container, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles'
import MainTableComponent from "./Components/MainTableComponent";
import StartedSelectionComponent from "./Components/StartedSelectionComponent";
import AuthComponent from "./Components/AuthComponent";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 8
    }, title: {
        flexGrow: 8
    }
}))

function App() {
    const classes = useStyles();
    const tok = localStorage.getItem('token')
    return (<>
        <div>
            <AppBar position="fixed">
                <Container fixed>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>Material site</Typography>
                        <Box mr={3}>
                            <Button color="inherit" variant="outlined">Log in</Button>
                        </Box>
                        <Button color="secondary" variant="contained">Sign up</Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
        <div>
            <Toolbar/>
            <main>
                <AuthComponent/>
            </main>
        </div>
    </>);

}

export default App;

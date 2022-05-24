import './App.css';
import {Button, AppBar, Box, Container, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles'
import AuthComponent from "./Components/AuthComponent";
import StartedSelectionComponent from "./Components/StartedSelectionComponent";
import {Routes, Route, Link} from 'react-router-dom'
import MainTableComponent from "./Components/MainTableComponent";
import {useState} from "react";
import TestComponent from "./Components/TestComponent";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 8
    }, title: {
        flexGrow: 8
    }
}))



window.addEventListener("beforeunload", (e)=>{
    e.preventDefault()
    localStorage.setItem('token', null)
    localStorage.setItem('post', null)
})

function App() {
    const classes = useStyles();
    return (
        <>
            <div>
                <AppBar position="fixed">
                    <Container fixed>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" style={{flexGrow: 8}}>Material site</Typography>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
            <div>
                <Toolbar/>
                <Routes>
                    <Route path="/test" element={<TestComponent/>}/>
                    <Route path="/" element={<AuthComponent/>}></Route>
                    <Route path="/sel" element={<StartedSelectionComponent/>}></Route>

                </Routes>
            </div>
        </>);

}

export default App;

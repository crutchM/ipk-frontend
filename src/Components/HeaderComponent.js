import {Component, useEffect, useState} from "react";
import {AppBar, Button, ButtonGroup, Container, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Navigate} from "react-router-dom";
import { Link } from "react-router-dom";


const AppBarComponent = (props) => {
    const [post, setPost] = useState(0)
    useEffect(()=>{
        setTimeout(()=>{setPost(Number(localStorage.getItem('post')))}, 100)
    })
    const [buttonBar, setButtonBar] = useState(null)
    if (post !== 1) {
        return defaultHeader()
    } else return adminHeader()
}

function defaultHeader() {
    return (<>
        <div>
            <AppBar position="fixed">
                <Container fixed>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" style={{flexGrow: 8}}>Material site</Typography>
                        <Button href="/sel">home</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar/>
        </div>
    </>)
}



function adminHeader() {
    return (
        <>
            <div>
                <AppBar position="fixed">
                    <Container fixed>
                        <Toolbar>
                            <IconButton sx={{ mr: 2 }} edge="start" color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" style={{flexGrow: 8}}>Material site</Typography>
                            <ButtonGroup align="right" variant="contained" aria-label="outlined primary button group">
                                <Button  variant="text"><Link to="/sel">home</Link></Button>
                                <Button  variant="text"> <Link to="/chair">Chair</Link></Button>
                            </ButtonGroup>

                        </Toolbar>
                    </Container>
                </AppBar>
                <Toolbar/>
            </div>
        </>
    )
}


export default AppBarComponent

// class HeaderComponent extends Component {
//
//     constructor(props) {
//         super(props)
//         this.state = {
//             post: props.post
//         }
//     }
//
//     render() {
//         return (
//             <>
//                 <AppBar position="fixed">
//                     <Container fixed>
//                         <Toolbar>
//                             <IconButton edge="start" color="inherit" aria-label="menu">
//                                 <MenuIcon/>
//                             </IconButton>
//                             <Typography variant="h6" style={{flexGrow: 8}}>Material site</Typography>
//                         </Toolbar>
//                     </Container>
//                 </AppBar>
//             </>)
//     }
// }

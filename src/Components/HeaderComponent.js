import {Component, useEffect, useState} from "react";
import {AppBar, Button, ButtonGroup, Container, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


const AppBarComponent = (props) => {
    const [post, setPost] = useState(props.post)
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
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button>One</Button>
                                <Button>Two</Button>
                                <Button>Three</Button>
                            </ButtonGroup>
                            <Typography variant="h6" style={{flexGrow: 8}}>Material site</Typography>
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

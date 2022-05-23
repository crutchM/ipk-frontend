import React, {Component} from 'react'
import LocalStorageHelper from "../common/LocalStorageHelper";
import {
    Grid,
    TextField,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Box,
    InputAdornment,
    IconButton, Typography, Button
} from "@mui/material";
import {Navigate} from "react-router-dom";

export default class AuthComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: null,
            error: null,
            tError: props.error,
            users: [],
            token: null,
            login: null,
            password: null,
            authorized: false,
            post: 0
        }
        this.storage = new LocalStorageHelper()
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleTextField = this.handleTextField.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('token') !== "null") {
            return (
                <Navigate to="/sel" replace></Navigate>
            )
        } else {
            fetch("http://localhost:8081/auth/getall")
                .then((result) => (result.json()))
                .then((data) => {
                        this.setState({
                            isLoaded: true,
                            error: false,
                            users: data.users
                        })
                    }, (error) => {
                        this.setState({
                                isLoaded: true,
                                error: error
                            }
                        )
                    }
                )
        }
    }

    handleChange(event) {
        let data = event.target.value
        this.setState({
            login: data
        })

    }

    handleTextField(event) {
        let data = event.target.value
        this.setState({
            password: data
        })
    }

    handleClick(event) {
        this.setState({
            isLoaded: false,
            error: false
        })
        console.log(JSON.stringify({'login': this.state.login, 'password': this.state.password}))
        const requestOptions = {
            method: 'POST',
            headers: {'Content-type': 'Application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            body: JSON.stringify({'username': this.state.login, 'password': this.state.password})
        }

        fetch("http://localhost:8081/auth/sign-in", requestOptions)
            .then((data) => data.json())
            .then((result) => {
                console.log(result.token)
                this.setState({
                    isLoaded: true,
                })
                this.storage.setData('token', result.token)
                this.setState({authorized: true})
            })

    }


    render() {
        if (this.state.authorized) {
            return (
                <Navigate to="/sel" replace></Navigate>
            )
        } else {
            return (
                <>
                    <Grid container spacing={7} style={{paddingTop: 100}} alignItems="center" justifyContent="center">
                        <Box textAlign='center' sx={{p: 2, border: '1px dashed grey'}}>
                            <Grid item>
                                <Typography variant="h5">
                                    Авторизация
                                </Typography>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth style={{marginTop: 20}}>
                                    <InputLabel id="demo-simple-select-label">Пользователь</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Пользователь"
                                        onChange={this.handleChange}
                                        style={{width: 250}}
                                        defaultValue={""}
                                    >
                                        {this.state.users.map(item => (
                                            <MenuItem value={item.login}>
                                                {item.fullname}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <form>
                                <Grid item>
                                    <TextField
                                        error={this.state.error}
                                        id="password"
                                        type="password"
                                        label="Password"
                                        placeholder="Password"
                                        onChange={this.handleTextField}
                                        margin="normal"
                                        style={{width: 250, marginTop: 20}}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button onClick={this.handleClick} variant="outlined"
                                            style={{width: 250, marginTop: 20}}>Войти</Button>
                                </Grid>
                            </form>
                        </Box>
                    </Grid>
                </>
            )
        }
    }
}

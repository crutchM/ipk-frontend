import {Button, TextField} from "@mui/material";
import React, {useState} from "react";
import AppBarComponent from "../HeaderComponent";
import {Link} from "react-router-dom";


const RegisterUserComponent = (props) => {
    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const click = () => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(
                {
                    fullname: name,
                    login: login,
                    chair: Number(localStorage.getItem('chair')),
                    post: 3,
                    password: '123'
                })
        }
        fetch("http://192.168.11.40:8081/auth/sign-up", requestOptions)
            .then((data) => data.json())
            .then((result) => console.log(result))
    }
    return (
        <>
            <AppBarComponent/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{alignSelf: 'center'}}>
                    <div style={{display: 'block'}}>
                        <div>
                            <TextField
                                id="fullname"
                                type="text"
                                label="ФИО"
                                placeholder="text"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                margin="normal"
                                style={{width: 250, marginTop: 20}}
                            />
                        </div>
                        <div>
                            <TextField
                                id="login"
                                type="text"
                                label="логин"
                                placeholder="text"
                                onChange={(e) => {
                                    setLogin(e.target.value)
                                }}
                                margin="normal"
                                style={{width: 250, marginTop: 20}}
                            />
                        </div>
                        <div>
                            <Button onClick={click} variant="outlined"
                                    style={{width: 250, marginTop: 20}}>
                                <Link to="/users">
                                    Создать пользователя
                                </Link>

                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterUserComponent

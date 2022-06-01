import React, {Component, useEffect, useState} from "react";
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import {Navigate, Link} from "react-router-dom";
import AppBarComponent from "../HeaderComponent";


const NewUserComponent = (props) => {
    const [chair, setChair] = useState([])
    const setter = (id) => {

    }
    const rem = (id) =>{
        for (let i= 0; i<chair.length; i++){
            if (chair[i].id === id){
                setChair(chair.splice(i, 1))
            }
        }
    }
    useEffect(() => {
        fetchData().then((data) => setChair(data))
    }, [])

    if (localStorage.getItem('token') === 'null') {
        return (<Navigate to='/' replace/>)
    }
    return (
        <>
            <AppBarComponent/>
            <>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 60}}>
                    <div style={{alignSelf: 'center'}}>
                        <div style={{display: 'block'}}>
                            <div>
                                {chair.length === 0 && (
                                    <Typography variant="h6">Преподаватели с этой кафедры
                                        отсутствуют в базе</Typography>
                                )}
                            </div>
                            <div>
                                {chair.length !== 0 && (
                                    <>

                                        <Typography style={{marginLeft: 70}} variant="h6">Управление
                                            кадрами</Typography>
                                        <Grid container>
                                            <>
                                                <div style={{display: 'block'}}>


                                                    {chair.map((item) => (
                                                        <>
                                                            <div>
                                                                <Grid item>
                                                                    <Paper elevation={2}
                                                                           style={{marginTop: 20, width: 400}}>
                                                                        <Box sx={{flexGrow: 1}}>
                                                                            <Grid container spacing={2}>
                                                                                <div style={{display: "block", width:400, paddingLeft:50}}>
                                                                                    <div>
                                                                                        <Grid item xs="auto">
                                                                                            <Typography style={{
                                                                                                paddingLeft: 7,
                                                                                                paddingTop: 5
                                                                                            }}>{item.fullname}</Typography>
                                                                                        </Grid>
                                                                                    </div>
                                                                                    <div>
                                                                                        <Grid item xs="8">
                                                                                            <Button variant="outlined"
                                                                                                    onClick={(event) =>{
                                                                                                        rem(item.id)
                                                                                                        remove(item.id)}
                                                                                            }>
                                                                                                <Link to="/transfer">
                                                                                                    Удалить пользователя
                                                                                                </Link>
                                                                                            </Button>
                                                                                        </Grid>
                                                                                    </div>
                                                                                </div>
                                                                            </Grid>
                                                                        </Box>

                                                                    </Paper>
                                                                </Grid>
                                                            </div>
                                                        </>
                                                    ))}
                                                </div>
                                            </>
                                        </Grid>
                                    </>
                                )}
                            </div>
                            <div>
                                <Button style={{marginLeft: 40, marginTop: 10}} variant="contained">
                                    <Link to="/reg" style={{textDecoration: 'none', color: 'white'}}>
                                        Добавить нового преподавателя
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </>


        </>
    )
}

function handleClick(event, id) {

}
async function remove(id){
    console.log(id)
    fetch('http://192.168.11.40:8081/api/stat/remove', {
        method: 'POST',
        headers: new Headers({
            Authorization: "Bearer " + localStorage.getItem('token')
        }),
        body: JSON.stringify({id: id})
    }).then(r => r.json())
        .then((resp)=> console.log(resp))
}

async function fetchData() {
    let users = []
    await fetch("http://192.168.11.40:8081/api/user/teachers", {
        headers: new Headers({
            Authorization: "Bearer " + localStorage.getItem('token'), 'Access-Control-Allow-Origin': 'http://localhost:3000'
        })
    })
        .then((data) => data.json())
        .then((result) => {
            users = result.teachers
            console.log(users)
        })
    console.log(users)
    let tmp = []
    users.forEach((item) => {
        if (item.chair === Number(localStorage.getItem('chair'))) {
            tmp.push(item)
        }
    })
    return tmp
}

export default NewUserComponent

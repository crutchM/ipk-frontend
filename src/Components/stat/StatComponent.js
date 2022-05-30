import React, {useEffect, useState} from "react";
import HeaderComponent from "../HeaderComponent";
import {
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Link, Navigate} from 'react-router-dom'

async function fetchData() {
    const response = await fetch('http://localhost:8081/api/stat/getStat', {
        method: 'POST',
        headers: new Headers({
            Authorization: "Bearer " + localStorage.getItem('token')
        }),
        body: JSON.stringify({'id': Number(localStorage.getItem('chair'))})
    })
    const data = await response.json()
    return data.results
}

const StatComponent = (props) => {
    const [ar, seAr] = useState([])
    const [bl, setBl] = useState([])
    useEffect(() => {
        fetchData()
            .then((data) => {
                seAr(data)
                setBl(data[0].blocks)
            })
    }, [])
    if (localStorage.getItem('token') === 'null'){
        return (<Navigate to='/' replace/>)
    }
    return (
        <>
            <div>
                <HeaderComponent>
                </HeaderComponent>
            </div>
            {ar.length === 0 &&(
                <div>Loading....</div>
            )}
            {ar.length!==0 && (
                <>
                    <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                        <Grid item style={{alignSelf: 'center'}}>
                            <Box>
                                <Paper elevation={2}>
                                    <Typography>Общая статистика по сотрудникам .....</Typography>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                    <div>
                        <TableContainer>
                            <Table style={{borderTopWidth: 1, borderStyle: 'solid'}}>
                                <TableHead>
                                    <TableRow style={{borderTopWidth: 3, borderStyle: 'solid'}}>
                                        <TableCell
                                            style={{maxWidth: 100, border: 1, borderStyle: 'solid'}}>Преподаватель</TableCell>
                                        <TableCell style={{border: 1, borderStyle: 'solid'}}>Отметка времени</TableCell>
                                        <TableCell style={{border: 1, borderStyle: 'solid'}}>Дата занятия</TableCell>
                                        <TableCell style={{border: 1, borderStyle: 'solid'}}>Тип занятия</TableCell>
                                        <TableCell style={{border: 1, borderStyle: 'solid'}}>Эксперт</TableCell>
                                        {bl.map(item => (
                                            <>
                                                {item.questions.map(element => (
                                                    <TableCell style={{
                                                        border: 1,
                                                        borderStyle: 'solid'
                                                    }}>{element.number}</TableCell>
                                                ))}

                                            </>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{borderTopWidth: 2, borderStyle: 'solid'}}>
                                    {ar.map(item => (
                                        <TableRow tyle={{borderTopWidth: 2, borderStyle: 'solid'}}>
                                            <TableCell style={{border: 1, borderStyle: 'solid'}}>
                                                <Link to="/individual" state={{id:item.teacher.id}}>
                                                    {item.teacher.fullname}
                                                </Link>
                                            </TableCell>
                                            <TableCell style={{border: 1, borderStyle: 'solid'}}>{item.anketDate}</TableCell>
                                            <TableCell style={{border: 1, borderStyle: 'solid'}}>{item.lessonDate}</TableCell>
                                            <TableCell style={{border: 1, borderStyle: 'solid'}}>{item.employment}</TableCell>
                                            <TableCell style={{border: 1, borderStyle: 'solid'}}>{item.expert.name}</TableCell>
                                            {item.blocks.map(block => (
                                                <>
                                                    {block.questions.map(element => (
                                                        <TableCell style={{
                                                            border: 1,
                                                            borderStyle: 'solid'
                                                        }}>{element.answer}</TableCell>
                                                    ))
                                                    }
                                                </>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </>
            )}
        </>
    )
}


export default StatComponent

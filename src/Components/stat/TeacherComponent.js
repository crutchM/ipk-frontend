import React, {Component, useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
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


const TeacherComponent = (props) => {
    const [results, setResults] = useState([])
    const [tmp, setTmp] = useState("")
    const location = useLocation()
    useEffect(() => {
        fetchData(location.state.id).then(data => {
                setResults(data)
                setTmp(data[0].teacher.fullname)
            }
        )
        // .then((data)=> {
        //     console.log(data[0])
        //     setTmp(data[0])
        // })
    }, [])
    if(localStorage.getItem('token') === 'null'){
        return <Navigate to='/' replace/>
    } else if (Number(localStorage.getItem('post')) !== 1){
        return <Navigate to='/sel' replace/>
    }
    return (
        <>
            <div >
                <HeaderComponent/>
            </div>
            {results.length === 0 && (
                <div style={{display: 'flex', justifyContent: 'center'}}><Typography style={{alignSelf: 'center'}}>loading...</Typography></div>
            )}
            {results.length !== 0 && (
                <>
                    <div>
                        <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                            <Grid item style={{alignSelf: 'center'}}>
                                <Box>
                                    <Paper elevation={2}>
                                        <Typography variant="h6">
                                            Преподаватель: {tmp}
                                        </Typography>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item >
                                <TableContainer style={{marginLeft: 30, marginTop: 10}}>
                                    <Paper elevation={2} style={{maxWidth:300, textAlign: 'center'}}>
                                        <Typography variant="h6">
                                            Результаты всех опросов
                                        </Typography>
                                    </Paper>
                                    <Table style={{borderTopWidth: 1, borderStyle: 'solid', maxWidth: 1100}}>
                                        <TableHead>
                                            <TableRow style={{borderTopWidth: 3, borderStyle: 'solid'}}>
                                                <TableCell style={{border: 1, borderStyle: 'solid'}}>Эксперт</TableCell>
                                                {results[0].blocks.map(item => (
                                                    <>
                                                        {item.questions.map(ques => (
                                                            <>
                                                                <TableCell style={{
                                                                    border: 1,
                                                                    borderStyle: 'solid'
                                                                }}>{ques.number}</TableCell>
                                                            </>
                                                        ))}
                                                    </>
                                                ))}
                                                <TableCell>
                                                    Среднее значение
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {results.map(item => (
                                                <>
                                                    <TableRow>
                                                        <TableCell style={{border: 1, borderStyle: 'solid'}}>
                                                            {item.expert.name}
                                                        </TableCell>
                                                        {item.blocks.map(block => (
                                                            <>
                                                                {block.questions.map(element => (
                                                                    <>
                                                                        <TableCell
                                                                            style={{border: 1, borderStyle: 'solid'}}>
                                                                            {element.answer}
                                                                        </TableCell>
                                                                    </>
                                                                ))}
                                                            </>
                                                        ))}
                                                        <TableCell style={{border: 1, borderStyle: 'solid'}}>
                                                            {calculate(item)}
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            <Grid item>
                                <TableContainer style={{marginLeft: 40, marginTop: 10}}>
                                    <Paper elevation={2} style={{maxWidth:500, textAlign: 'center'}}>
                                        <Typography variant="h6">
                                            Средние ценки среди всех типов экспертов
                                        </Typography>
                                    </Paper>
                                    <Table style={{borderTopWidth: 1, borderStyle: 'solid', maxWidth: 1100}}>
                                        <TableHead>
                                            <TableRow style={{borderTopWidth: 3, borderStyle: 'solid'}}>
                                                <TableCell style={{border: 1, borderStyle: 'solid'}}>
                                                    Эксперт
                                                </TableCell>
                                                <TableCell style={{border: 1, borderStyle: 'solid'}}>Низкий</TableCell>
                                                <TableCell style={{border: 1, borderStyle: 'solid'}}>Ниже
                                                    среднего</TableCell>
                                                <TableCell style={{border: 1, borderStyle: 'solid'}}>Средний</TableCell>
                                                <TableCell style={{border: 1, borderStyle: 'solid'}}>Выше
                                                    среднего</TableCell>
                                                <TableCell style={{border: 1, borderStyle: 'solid'}}>Высокий</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    style={{border: 1, borderStyle: 'solid'}}>Заведующий</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 1, 1, 1.49)}</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 1, 1.5, 2.39)}</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 1, 2.4, 3.49)}</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 1, 3.5, 4.49)}</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 1, 4.5, 5)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    style={{border: 1, borderStyle: 'solid'}}>Взаимооценка</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 2, 1, 1.49)}</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 2, 1.5, 2.39)}</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 2, 2.4, 3.49)}</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 2, 3.5, 4.49)}</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 2, 4.5, 5)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    style={{border: 1, borderStyle: 'solid'}}>Самооценка</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 3, 1, 1.49)}</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 3, 1.5, 2.39)}</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 3, 2.4, 3.49)}</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 3, 3.5, 4.49)}</TableCell>
                                                <TableCell style={{
                                                    border: 1,
                                                    borderStyle: 'solid'
                                                }}>{calculateTotal(results, 3, 4.5, 5)}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </div>
                </>
            )}


        </>)
}

function calculateTotal(res, expert, min, max) {
    let tmp = []
    let result = 0
    res.forEach((element) => {
        if (element.expert.id === expert) {
            tmp.push(element)
        }
    })
    tmp.forEach((element) => {
        let m = calculate(element)
        if (m <= max && m >= min) {
            result = result + 1
        }
    })
    return result
}

function calculate(item) {
    let result = 0
    for (let i = 0; i < item.blocks.length; i++) {
        for (let j = 0; j < item.blocks[i].questions.length; j++) {
            result = result + item.blocks[i].questions[j].answer
        }
    }
    return Math.round((result / 12) * 10) / 10
}

async function fetchData(id) {
    const response = await fetch('http://192.168.11.40:8081/api/stat/getIndividual', {
        method: 'POST',
        headers: new Headers({
            Authorization: "Bearer " + localStorage.getItem('token')
        }),
        body: JSON.stringify({'id': id})
    })
    const data = await response.json()
    return data.results

}


export default TeacherComponent

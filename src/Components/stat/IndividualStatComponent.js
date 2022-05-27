import React, {useCallback, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom"
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
import {Navigate} from "react-router-dom";

let id = null
async function fetchData() {
    const response = await fetch('http://localhost:8081/api/stat/getIndividual', {
        method: 'POST',
        headers: new Headers({
            Authorization: "Bearer " + localStorage.getItem('token')
        }),
        body: JSON.stringify({'id': id})
    })
    const data = await response.json()
    return data.results
}


const IndividualStatComponent = (props) => {
    const [results, setResults] = useState([])
    const [tmp, setTmp] = useState([])
    const location = useLocation()
    id = location.state.id
    useEffect(()=>{
        fetchData()
            .then((data)=>{
                setResults(data)
            })
    }, [])
    if (localStorage.getItem('token') === 'null') {
        return (<Navigate to='/' replace/>)
    }
    return (
        <>
            <div>
                <HeaderComponent/>
            </div>
            <div>
                <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                    <Grid item style={{alignSelf: 'center'}}>
                        <Box>
                            <Paper elevation={2}>
                                <Typography variant="h6">
                                    Преподаватель: {results[0].teacher.fullname}
                                </Typography>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop:10}}>
                    <Grid item>
                        <TableContainer>
                            <Table style={{borderTopWidth: 1, borderStyle: 'solid', maxWidth: 1000}}>
                                <TableHead>
                                    <TableRow style={{borderTopWidth: 3, borderStyle: 'solid'}}>

                                        <TableCell style={{border: 1, borderStyle: 'solid'}}>
                                            Эксперт
                                        </TableCell>
                                        {tmp.map(item => (
                                            <>
                                                {item.questions.map(element => (
                                                    <>
                                                        <TableCell style={{border: 1, borderStyle: 'solid'}}>
                                                            {element.number}
                                                        </TableCell>
                                                    </>
                                                ))}
                                            </>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {results.map(item => (
                                        <>
                                            <TableRow>
                                                <TableCell style={{border: 1, borderStyle: 'solid'}}>{item.expert.name}</TableCell>
                                                {item.blocks.map(block => (
                                                    <>
                                                        {block.questions.map(element => (
                                                            <>
                                                                <TableCell style={{border: 1, borderStyle: 'solid'}}>{element.answer}</TableCell>
                                                            </>
                                                        ))}
                                                    </>
                                                ))}
                                            </TableRow>
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item style={{marginLeft:10}}>
                        <TableContainer>
                            <Table style={{borderTopWidth: 1, borderStyle: 'solid', width: 400}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Блок</TableCell>
                                        <TableCell>Блок</TableCell>
                                        <TableCell>Блок</TableCell>
                                        <TableCell>Блок</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Значение</TableCell>
                                        <TableCell>Значение</TableCell>
                                        <TableCell>Значение</TableCell>
                                        <TableCell>Значение</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>

            </div>

        </>
    )

}




export default IndividualStatComponent


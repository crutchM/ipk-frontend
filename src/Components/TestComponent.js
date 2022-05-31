import React, {Component, useEffect} from "react";
import {
    Button, FormControl,
    Grid,
    Box,
    InputLabel, MenuItem, Select,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Paper, Typography
} from "@mui/material";
import AuthComponent from "./AuthComponent";
import StartedSelectionComponent from "./StartedSelectionComponent";
import {Navigate} from "react-router-dom";
import AppBarComponent from "./HeaderComponent";


export default class TestComponent extends Component {

    constructor(props) {
        super(props);
        this.row = 0
        this.state = {
            test: [],
            answers: [{answer: 1, 'text': 'низкий'}, {answer: 2, 'text': 'ниже среднего'}, {
                answer: 3,
                'text': 'средний'
            }, {answer: 4, 'text': 'выше среднего'}, {answer: 5, 'text': 'высокий'}],
            results: [],
            filled: 0,
            questionsCount: 0,
            row: 0,
            reqData: [],
            sended: false,
            teacher: "",
            expert: "",
            employment: ""
        }

        this.formRequest = this.formRequest.bind(this)

        this.submitAnket = this.submitAnket.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
    }

    componentDidMount() {
        fetch('http://192.168.11.40:8081/api/test/', {
            headers: new Headers({
                Authorization: "Bearer " + localStorage.getItem('token')
            })
        })
            .then((data) => data.json())
            .then((result) => {
                this.setState({test: result.test.blocks})
            })

        for (let i = 0; i < this.state.test.length; i++) {
            for (let j = 0; j < this.state.test[i].questions.length; j++) {
                this.setState({
                    questionsCount: this.state.questionsCount + 1
                })
            }
        }
        console.log("count: " + this.state.questionsCount)
    }

    handleOnChange(event, object) {
        object.answer = event.target.value
        //console.log(this.state.test)
        this.state.results.push(object)
        this.setState({
            filled: this.state.filled + 1
        })
        console.log('filled: ' + this.state.filled)
    }

    formRequest() {
        let ar = this.state.test
        let res = this.state.results
        for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < ar.length; j++) {
                if (res[i].block === ar[j].id) {
                    for (let k = 0; k < ar[j].questions.length; k++) {
                        if (ar[j].questions[k].id === res[i].question) {
                            ar[j].questions[k].answer = res[i].answer
                        }
                    }
                }
            }
        }
        //console.log(ar)
        this.state.reqData = ar
        this.setState({
            reqData: ar
        })
        //console.log(this.state.reqData)
    }

    submitAnket(event) {
        // if(this.state.results.length !== this.state.questionsCount){
        //     alert('вы заполнили не все поля')
        // } else
        // if (this.state.filled !== 12) {
        //     alert("вы заполнили не все поля")
        //     return
        // }
        {
            fetch('http://192.168.11.40:8081/api/test/sendStat', {
                method: 'POST',
                headers: new Headers({
                    Authorization: "Bearer " + localStorage.getItem('token')
                }),
                body: JSON.stringify(
                    {
                        stat: {
                            userId: localStorage.getItem('teacher'),
                            postId: 1,
                            chairId: Number(localStorage.getItem('chair')),
                            employment: Number(localStorage.getItem('employment')),
                            expert: Number(localStorage.getItem('expert')),

                        },
                        anketDate: Math.trunc(new Date() /1000),
                        date: Number(localStorage.getItem('lessonDate'))
                        // lessonDate: null,
                        // anketDate: Date.now()
                    })
            })
                .then((data) => data.json())
                .then((result) => {
                    // console.log(result.rowId)
                    this.formRequest()
                    console.log(this.state.reqData)
                    fetch("http://192.168.11.40:8081/api/test/sendResults", {
                        method: 'POST',
                        headers: new Headers({
                            Authorization: "Bearer " + localStorage.getItem('token')
                        }),
                        body: JSON.stringify(
                            {
                                blocks: this.state.reqData,
                                test: result.rowId
                            })
                    })
                        .then((respone) => respone.json())
                        .then((status) => {
                            console.log(status.status)
                        })

                })
            this.setState({
                sended: true
            })
        }

    }


    render() {
        if (localStorage.getItem('token') === "null") {
            return (<Navigate to="/" replace/>)
        }
        if (this.state.sended) {
            return (<Navigate to="/sel" replace/>)
        }
        return (
            <>
                <AppBarComponent post={Number(localStorage.getItem('post'))}/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{alignSelf: 'center'}}>
                        <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                            <Grid item style={{alignSelf: 'center', display: 'flex', justifyContent: 'center'}}>
                                <div style={{display:'block'}}>
                                    <Box style={{alignSelf: 'center'}}>
                                        <Paper elevation={2}>
                                            <Typography>Преподаватель: {localStorage.getItem('teachS')}</Typography>
                                            <Typography>Эксперт: {localStorage.getItem('expertS')}</Typography>
                                            <Typography>Тип занятия: {localStorage.getItem('empS')}</Typography>
                                        </Paper>
                                    </Box>
                                    <Box style={{alignSelf: 'center', paddingTop:10}}>
                                        <Paper elevation={2} style={{maxWidth: 530}}>
                                            <Typography>5 баллов - Высокий уровень выраженности показателя</Typography>
                                            <Typography>4 балла - Уровень выраженности показателя выше среднего</Typography>
                                            <Typography>3 балла - Уровень выраженности показателя средний</Typography>
                                            <Typography>2 балла - Уровень выраженности показателя ниже среднего</Typography>
                                            <Typography>1 балл - Низкий уровень выраженности показателя</Typography>
                                        </Paper>
                                    </Box>
                                </div>
                            </Grid>
                            <Grid item sx={{paddingTop: 5}}>
                                <TableContainer>
                                    <Grid container spacing={5} alignItems="center" justifyContent="center"
                                    >
                                        {this.state.test.map(item => (
                                            <>
                                                <Grid item xs={8} style={{display: 'flex', justifyContent: 'center'}}>

                                                    <Table sx={{minWidth: 400}}
                                                           style={{
                                                               maxWidth: 1000,
                                                               borderTopWidth: 1,
                                                               borderStyle: 'solid',
                                                               alignSelf: 'center'
                                                           }}
                                                           textAlign='center'>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell> {item.name + ' компонент'} </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {item.questions.map(ques => (
                                                                <>
                                                                    <TableRow
                                                                        style={{borderTopWidth: 2, borderStyle: 'solid'}}>
                                                                        <TableCell>{ques.number}</TableCell>
                                                                        <TableCell>{ques.text}</TableCell>
                                                                        <TableCell>
                                                                            <FormControl fullWidth>
                                                                                <InputLabel
                                                                                    id="demo-simple-select-label">ответ</InputLabel>
                                                                                <Select
                                                                                    labelId="demo-simple-select-label"
                                                                                    id="demo-simple-select"
                                                                                    label="ответ"
                                                                                    onChange={(e) => {
                                                                                        this.handleOnChange(e, {
                                                                                            block: item.id,
                                                                                            question: ques.id,
                                                                                            answer: 0
                                                                                        })
                                                                                    }}
                                                                                    style={{width: 100}}
                                                                                    defaultValue={""}
                                                                                >
                                                                                    {this.state.answers.map(ans => (
                                                                                        <MenuItem
                                                                                            value={ans.answer}>{ans.answer}</MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </>
                                                            ))}
                                                        </TableBody>
                                                    </Table>

                                                </Grid>

                                            </>
                                        ))}
                                        <Grid item xs={8} textAlign='center'>
                                            <Button variant="contained" onClick={this.submitAnket}>Отправить форму</Button>
                                        </Grid>

                                    </Grid>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </div>
                </div>

            </>
        )
    }
}


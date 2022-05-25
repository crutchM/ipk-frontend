import {Component, useEffect} from "react";
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
    TableRow
} from "@mui/material";
import AuthComponent from "./AuthComponent";
import StartedSelectionComponent from "./StartedSelectionComponent";
import {Navigate} from "react-router-dom";


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
            questionsCount: 0,
            row: 0,
            reqData: []
        }

        this.formRequest = this.formRequest.bind(this)

        this.submitAnket = this.submitAnket.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:8081/api/test/', {
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
    }

    handleOnChange(event, object) {
        object.answer = event.target.value
        //console.log(this.state.test)
        this.state.results.push(object)
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
        fetch('http://localhost:8081/api/test/sendStat', {
            method: 'POST',
            headers: new Headers({
                Authorization: "Bearer " + localStorage.getItem('token')
            }),
            body: JSON.stringify(
                {
                    userId: localStorage.getItem('teacher'),
                    postId: 1,
                    chairId: Number(localStorage.getItem('chair')),
                    employment: Number(localStorage.getItem('employment')),
                    expert: Number(localStorage.getItem('expert'))
                    // lessonDate: null,
                    // anketDate: Date.now()
                })
        })
            .then((data) => data.json())
            .then((result) => {
                // console.log(result.rowId)
                this.formRequest()
                console.log(this.state.reqData)
                fetch("http://localhost:8081/api/test/sendResults", {
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


    }


    render() {
        if (localStorage.getItem('token') === "null") {
            return (<Navigate to="/" replace/>)
        }
        return (
            <>
                <TableContainer>
                    <Grid container spacing={5} alignItems="center" justifyContent="center"
                          style={{paddingTop: 20}}>
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
                                            <TableRow style={{borderTopWidth: 1, borderStyle: 'solid'}}>
                                                <TableCell> {item.name}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody style={{borderTopWidth: 1, borderStyle: 'solid'}}>
                                            {item.questions.map(ques => (
                                                <>
                                                    <TableRow style={{borderTopWidth: 1, borderStyle: 'solid'}}>
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
                                                                    style={{width: 200}}
                                                                    defaultValue={""}
                                                                >
                                                                    {this.state.answers.map(ans => (
                                                                        <MenuItem
                                                                            value={ans.answer}>{ans.text}</MenuItem>
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
            </>
        )
    }
}


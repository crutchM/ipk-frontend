import {Component} from "react";
import {
    Button, FormControl,
    Grid,
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


function Typography() {
    return null;
}

export default class TestComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            test: [],
            answers: [{answer: 1, 'text': 'низкий'}, {answer: 2, 'text': 'ниже среднего'}, {
                answer: 3,
                'text': 'средний'
            }, {answer: 4, 'text': 'выше среднего'}, {answer: 5, 'text': 'высокий'}],
            results: []
        }

        this.handleOnChange = this.handleOnChange.bind(this)
    }

    getTest() {
        fetch('http://localhost:8081/api/test/', {
            headers: new Headers({
                Authorization: "Bearer " + localStorage.getItem('token')
            })
        })
            .then((data) => data.json())
            .then((result) => {
                this.setState({test: result.test.blocks})
            })
    }

    handleOnChange(event, object) {
        object.answer = event.target.value
        this.state.results.push(object)
    }



    render() {
        if (localStorage.getItem('token') === "null") {
            return (<Navigate to="/" replace/>)
        }
        this.getTest()
        return (
            <>
                <TableContainer>
                    <Grid container spacing={5} alignItems="center" justifyContent="center"
                          style={{paddingTop: 20}}>
                    {this.state.test.map(item => (
                        <>

                                <Grid item xs={8}>
                                    <Table sx={{minWidth: 400}}
                                           style={{
                                               maxWidth: 1000,
                                               borderTopWidth: 1,
                                               borderStyle: 'solid'
                                           }}>
                                        <TableHead>
                                            <TableRow style={{borderTopWidth: 1, borderStyle: 'solid'}}>
                                                <TableCell align="center"> {item.name}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {item.questions.map(ques => (
                                                <>
                                                    <TableRow style={{borderTopWidth: 1, borderStyle: 'solid'}}>
                                                        <TableCell align="left">{ques.number}</TableCell>
                                                        <TableCell align="left">{ques.text}</TableCell>
                                                        <TableCell align="right">
                                                            <FormControl fullWidth>
                                                                <InputLabel
                                                                    id="demo-simple-select-label">ответ</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    label="ответ"
                                                                    onChange={(e) => {
                                                                        this.handleOnChange(e, {block:item.id, question:ques.id, answer: 0})}}
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
                        <Grid Item>
                                <Button variant="contained" onClick={console.log(this.state.results)}>Отправить форму</Button>
                        </Grid>
                    </Grid>
                </TableContainer>
            </>
        )
    }
}


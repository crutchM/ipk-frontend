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
            answers:[{answer:1,'text':'низкий'}, {answer:2,'text':'ниже среднего'}, {answer:3,'text':'средний'}, {answer:4,'text':'выше среднего'},{answer:5,'text':'высокий'}]
        }
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


    render() {
        this.getTest()
        return (
            <>
                <Grid container spacing={5} alignItems="center" justifyContent="center"
                      style={{paddingTop: 100}}>
                    {this.state.test.map(item => (
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"> <Typography>{item.name}</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item.questions.map(question=>(
                                        <>
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 1 }}}>
                                                <TableCell align="left">{question.number}</TableCell>
                                                <TableCell align="left">{question.text}</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">ответ</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            label="ответ"
                                                            onChange={(e)=>{}}
                                                            style={{width: 200}}
                                                            defaultValue={""}
                                                        >
                                                            {this.state.answers.map(ans => (
                                                                <MenuItem value={ans.answer}>{ans.text}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ))}

                </Grid>

            </>
        )
    }
}


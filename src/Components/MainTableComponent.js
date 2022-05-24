import {Component} from "react";
import {
    Grid,
    Box,
    Select,
    InputLabel,
    MenuItem,
    SelectChangeEvent,
    FormControl,
    Typography
} from '@mui/material'

class Question {
    constructor(question) {
        this.question = question
        this.answers = ['1', '2', '3', '4', '5']
    }
}


export default class MainTableComponent extends Component {
    constructor(props) {
        super(props);
        this.answer = 1
        console.log(props.stat)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {

    }

    handleChange(event) {
        this.answer = event.target.value
    }


    render() {
        const questions = [new Question('q1'), new Question('q2'), new Question('q3')]
        return (
            <Box>
                <div>
                    <form>
                        <Grid container spacing={5} alignItems="center" justifyContent="center"
                              style={{paddingTop: 20}}>
                            {questions.map(item => (
                                    <Grid item xs={8}>
                                        <Grid container spacing={5} alignItems="center" justifyContent="center">
                                            <Grid item>
                                                <Box sx={{border: 1, borderColor: 'grey.500' }}>
                                                    <Typography style={{margin:2, maxWidth: 500}}>
                                                        aboba aboba aboba aboba aboba aboba v aboba abobaaboba aboba v
                                                        vvaboba aboba
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Answer"
                                                        onChange={this.handleChange}
                                                        style={{
                                                            width: 100,
                                                            height: 58,
                                                            display: 'inline-block'
                                                        }}
                                                        defaultValue={""}
                                                    >
                                                        {item.answers.map(it => (
                                                            <MenuItem value={it}>
                                                                {it}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            )
                            }
                        </Grid>
                    </form>
                </div>
            </Box>
        )
    }
}

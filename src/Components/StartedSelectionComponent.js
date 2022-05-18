import {Component} from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import MainTableComponent from "./MainTableComponent";
import Stat from "../Stat";


export default class StartedSelectionComponent extends Component {
    constructor(props) {
        super(props);
        this.stat = new Stat(0,0,0,0,null,)


        this.handleSubmitTeacher = this.handleSubmitTeacher.bind(this)
        this.handleSubmitExpert = this.handleSubmitExpert.bind(this)
        this.handleSubmitEmployment = this.handleSubmitEmployment.bind(this)
        this.renderTest = this.renderTest.bind(this)
    }

    componentDidMount() {
        this.state = {
            teachers: [{name:'teacher1', id:`1`}, {name:'teacher2', id:`2`}, {name:'teacher3', id:`3`}, {name: 'teacher4', id:`4`}],
            experts: [{type:'лекция', id:`1`}, {type:'дискуссия', id:`2`}, {type:'Семинар', id:`3`}, {type:'Практика', id:`4`}],
            employments: [{type:'зав кафедры', id:`1`}, {type:'слушатель', id:`2`}, {type:'коллега', id:`3`}, {type:'самооценка', id:`4`}],
            teacher: null,
            expert: null,
            employment: null,
            filledFields: 0
        }
    }

    handleSubmitTeacher(event) {
        this.setState(state=>({
            filledFields: state.filledFields + 1,
            teacher: event.target.value
        }))
        this.renderTest()
    }
    handleSubmitExpert(event) {
        this.setState(state=>({
            filledFields: state.filledFields + 1,
            expert: event.target.value
        }))
        this.renderTest()
    }

    handleSubmitEmployment(event) {
        this.setState(state=>({
            filledFields: state.filledFields + 1,
            employment: event.target.value
        }))
        this.renderTest()
    }

    renderTest(){
        if(this.state.filledFields === 3) {
            this.stat.userId = this.state.teacher
            this.stat.expert = this.state.expert
            this.stat.employment = this.state.employment
            console.log(this.stat)
            return <MainTableComponent/>
        } else return <></>
    }

    render() {
        return (
            <Grid container spacing={5} alignItems="center" justifyContent="center"
                  style={{paddingTop: 100}}>
                <Grid item>
                    <div>
                        <Grid container spacing={3} alignItems="center" justifyContent="center">
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Teacher"
                                        onChange={this.handleSubmitTeacher}
                                        style={{width: 200}}
                                    >
                                        {this.state.teachers.map(item => (
                                            <MenuItem value={item.id.toString()}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Expert</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Expert"
                                        style={{width: 200}}
                                        onChange={this.handleSubmitExpert}
                                    >
                                        {this.state.employments.map(item => (
                                            <MenuItem value={item.id.toString()}>{item.type}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Employment</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Employment"
                                        style={{width: 200}}
                                        onChange={this.handleSubmitEmployment}
                                    >
                                        {this.state.experts.map(item => (
                                            <MenuItem value={item.id.toString()}>{item.type}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item>

                </Grid>
            </Grid>

        )
    }
}

import React, {Component} from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import Stat from "../Stat";
import App from "../App";
import AuthComponent from "./AuthComponent";
import {Navigate} from "react-router-dom";
import AppBarComponent from "./HeaderComponent";


export default class StartedSelectionComponent extends Component {
    constructor(props) {
        super(props);
        this.stat = new Stat(0, 0, 0, 0, null,)
        this.state = {
            teachers: [],
            employments: [],
            experts: [],
            teacher: null,
            expert: null,
            employment: null,
            filledFields: 0,
            post: 0
        }
        fetch('http://localhost:8081/api/user/', {
            headers: new Headers({
                Authorization: "Bearer " + localStorage.getItem('token')
            })
        })
            .then((result) => result.json())
            .then((data) => {
                localStorage.setItem('name', data.user.fullname)
                localStorage.setItem('chair', data.user.chair)
                localStorage.setItem('id', data.user.id)
                localStorage.setItem('post', data.user.post)
                this.setState({post: Number(data.user.post)})
            })

        this.handleSubmitTeacher = this.handleSubmitTeacher.bind(this)
        this.handleSubmitExpert = this.handleSubmitExpert.bind(this)
        this.handleSubmitEmployment = this.handleSubmitEmployment.bind(this)
        this.renderTest = this.renderTest.bind(this)
        this.getAllFields = this.getAllFields.bind(this)
    }


    handleSubmitTeacher(event) {
        this.setState(state => ({
            filledFields: state.filledFields + 1,
            teacher: event.target.value
        }))
        this.renderTest()
    }

    handleSubmitExpert(event) {
        this.setState(state => ({
            filledFields: state.filledFields + 1,
            expert: event.target.value
        }))
        this.renderTest()
    }

    componentDidMount() {

        this.getAllFields()
    }

    getAllFields() {

        fetch("http://localhost:8081/api/user/teachers", {
            headers: new Headers({
                Authorization: "Bearer " + localStorage.getItem('token')
            }),
            credentials: "include"
        })
            .then((data) => data.json())
            .then((result) => {

                this.setState({
                    teachers: result.teachers
                })
            })
        fetch("http://localhost:8081/api/user/experts", {
            headers: new Headers({
                Authorization: "Bearer " + localStorage.getItem('token')
            }),
            credentials: "include"
        })
            .then((data) => data.json())
            .then((result) => {
                this.setState({
                    experts: result.experts
                })
            })
        fetch("http://localhost:8081/api/user/employments", {
            headers: new Headers({
                Authorization: "Bearer " + localStorage.getItem('token')
            }),
            credentials: "include"
        })
            .then((data) => data.json())
            .then((result) => {
                this.setState({
                    employments: result.employments
                })
            })
    }

    handleSubmitEmployment(event) {
        this.setState(state => ({
            filledFields: state.filledFields + 1,
            employment: event.target.value
        }))
        console.log(this.state.filledFields)
        this.renderTest()
    }

    renderTest() {
        if (this.state.filledFields === 3) {
            this.stat.userId = this.state.teacher
            this.stat.expert = this.state.expert
            this.stat.employment = this.state.employment
            console.log(this.stat)
        }
    }

    render() {
        const post =Number(localStorage.getItem('post'))
        console.log(this.state.post)
        if (localStorage.getItem('token') === "null") {
            return (<Navigate to="/" replace/>)
        }
        if (this.state.filledFields === 3) {
            this.stat.userId = this.state.teacher
            this.stat.expert = this.state.expert
            this.stat.employment = this.state.employment
            //console.log(this.stat)
            localStorage.setItem('teacher', this.state.teacher)
            localStorage.setItem('expert', this.state.expert)
            localStorage.setItem('employment', this.state.employment)
            return (<Navigate to="/test" replace={true}/>)
        }

        return (
            <>
                <AppBarComponent/>
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
                                            defaultValue={""}
                                        >
                                            {this.state.teachers.map(item => (
                                                <MenuItem value={item.id}>{item.fullname}</MenuItem>
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
                                            defaultValue={""}
                                        >
                                            {this.state.experts.map(item => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
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
                                            defaultValue={""}
                                        >
                                            {this.state.employments.map(item => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
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
            </>

        )
    }
}

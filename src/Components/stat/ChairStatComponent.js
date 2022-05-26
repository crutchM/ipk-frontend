import {Component} from "react";
import HeaderComponent from "../HeaderComponent";
import {Grid, Table, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";


export default class ChairStatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
        this.load = this.load.bind(this)
        this.load()
    }

    load() {
        fetch('http://localhost:8081/api/stat/getStat', {
            method: 'POST',
            headers: new Headers({
                Authorization: "Bearer " + localStorage.getItem('token')
            }),
            body: JSON.stringify({'id': Number(localStorage.getItem('chair'))})
        })
            .then((data) => data.json())
            .then((result) => {
                    this.setState({users: result})
                    //console.log(this.state.users)
                }
            )
    }

    render() {
        console.log(this.state.users)
        console.log(this.state.users[0].blocks)
        return (
            <>
                <div>
                    <HeaderComponent>
                    </HeaderComponent>
                </div>
                {/*<div>*/}
                {/*    <TableContainer>*/}
                {/*        <Table>*/}
                {/*            <TableHead>*/}
                {/*                <TableRow>*/}
                {/*                    {this.state.users[0].blocks.map(item=>(*/}
                {/*                        <TableCell>*/}
                {/*                            {item.name}*/}
                {/*                        </TableCell>*/}
                {/*                    ))}*/}
                {/*                </TableRow>*/}
                {/*            </TableHead>*/}
                {/*        </Table>*/}
                {/*    </TableContainer>*/}
                {/*</div>*/}
            </>
        )
    }
}

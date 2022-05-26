import {Component} from "react";
import HeaderComponent from "../HeaderComponent";
import {Grid, Table, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";


export default class ChairStatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
        this.load = this.load.bind(this)

    }

    load() {

    }

    componentDidMount() {
        fetch('http://localhost:8081/api/stat/getStat', {
            method: 'POST',
            headers: new Headers({
                Authorization: "Bearer " + localStorage.getItem('token')
            }),
            body: JSON.stringify({'id': Number(localStorage.getItem('chair'))})
        })
            .then((data) => data.json())
            .then((result) => {
                    //console.log(result)
                    this.setState({
                        result: result.results
                    })
                    //console.log(this.state.results)
                }
            ).catch((error) => {
            console.log(error)
        })
    }

    render() {
        let ar = this.state.result
        console.log(ar)
        if (ar === undefined){
            console.log("undef")
        }
        console.log(ar[5])
        // this.state.result.map(item=>{console.log(item)})
        return (
            <>
                <div>
                    <HeaderComponent>
                    </HeaderComponent>
                </div>
                <div>
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

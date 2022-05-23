import {Component} from "react";
import {Button, Tab, Table, TableCell, TableHead, TableRow} from "@mui/material";
import AuthComponent from "./AuthComponent";
import StartedSelectionComponent from "./StartedSelectionComponent";


export default class TestComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            del: false,
            stat: props.stat
        }

        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(event) {
        this.setState({
            del: true
        })
    }

    render() {
        return (

            <div>
                <Button standart onClick={this.handleChange}>
                    Сбросить форму
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </div>
        )
    }
}


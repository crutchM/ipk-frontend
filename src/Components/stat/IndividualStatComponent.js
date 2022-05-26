import {Component} from "react";
import HeaderComponent from "../HeaderComponent";


export default class IndividualStatComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.render = this.render.bind(this)
    }




    render() {
        return (
            <div>
                <HeaderComponent post={1}></HeaderComponent>
            </div>
        );
    }

}

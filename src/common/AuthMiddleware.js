import App from "../App";


export default function performAuthExceptions(){
    if(localStorage.getItem('token') == null){
        return(
            <App/>
        )
    }
}

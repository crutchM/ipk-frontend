import {useEffect, useState} from "react";
import HeaderComponent from "../HeaderComponent";
import {TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";


const StatComponent = (props) => {
    const [ar, seAr] = useState([])
    useEffect(() => {
        fetch('http://localhost:8081/api/stat/getStat', {
            method: 'POST',
            headers: new Headers({
                Authorization: "Bearer " + localStorage.getItem('token')
            }),
            body: JSON.stringify({'id': Number(localStorage.getItem('chair'))})
        })
            .then((data) => data.json())
            .then((result) => {
                    seAr(result.results)
                }
            ).catch((error) => {
            console.log(error)
        })
    })
    return (
        <>
            <div>
                <HeaderComponent>
                </HeaderComponent>
            </div>
            {/*<div>*/}
            {/*    <TableContainer>*/}
            {/*       <TableHead>*/}
            {/*           <TableRow>*/}
            {/*               {ar[0].blocks.map(item=>(*/}
            {/*                       <TableCell>item.name</TableCell>))}*/}
            {/*           </TableRow>*/}
            {/*       </TableHead>*/}
            {/*    </TableContainer>*/}
            {/*</div>*/}
            <div>
                {ar.map(item=>(
                    <Typography>{item.employment}</Typography>
                ))}
            </div>
        </>
    )
}


export default StatComponent

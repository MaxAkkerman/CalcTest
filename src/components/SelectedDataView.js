import Grid from "@material-ui/core/Grid";
import {useReducer} from "react";
import React from "react";

function SelectedDataView(props) {
    function handleClick(){
        console.log("props", props)
    }

    return (

        <Grid className="TotalPrice__Main">
            <Grid className='TotalPrice__Main__1'>
                <Grid
                    onClick={()=>handleClick()}
                    className="TotalPrice__Main__Name">{props.categoryName}</Grid>
                <Grid
                    className="TotalPrice__Main__Unit">{props.categoryOption}</Grid>
                <Grid
                    className="TotalPrice__Main__Quantity">{props.amount} {props.optionType ? props.optionType : "м3"}</Grid>
                <Grid
                    className="TotalPrice__Main__Price">{props.optionPrice * props.amount} руб.</Grid>
            </Grid>
            <Grid className="TotalPrice__BottomLine"/>
        </Grid>
    )
}
export default SelectedDataView
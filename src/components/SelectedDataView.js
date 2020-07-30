import Grid from "@material-ui/core/Grid";
import React from "react";

function SelectedDataView(props) {
    // const [categoryName, categoryOption, amount, optionType, optionPrice] = props;
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
                    className="TotalPrice__Main__Quantity">{props.amount} {props.optionType}</Grid>
                <Grid
                    className="TotalPrice__Main__Price">{props.optionPrice} руб.</Grid>
            </Grid>
            <Grid className="TotalPrice__BottomLine"/>

        </Grid>
    )
}
export default SelectedDataView
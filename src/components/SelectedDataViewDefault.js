import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import React from "react";


function SelectedDataView() {
    return (

        <Grid className="TotalPrice__Main">
            <Grid className='TotalPrice__Main__1'>
                <Grid
                    className="TotalPrice__Main__Name">{currentData ? currentData[0].category_name : "Раствор"}</Grid>
                <Grid
                    className="TotalPrice__Main__Unit">{currentOptions ? currentOptions[0].name : option}</Grid>
                <Grid
                    className="TotalPrice__Main__Quantity">{amount} {currentData ? currentData[0].category_list[0].type : "м3"}</Grid>
                <Grid
                    className="TotalPrice__Main__Price">{currentOptions ? amount * currentOptions[0].price : currentData[0].category_list[0].price} руб.</Grid>
            </Grid>
            <Grid className="TotalPrice__BottomLine"/>
            <Grid className="TotalPrice__Price">
                ИТОГО:
                <span className="TotalPrice__PriceValue">
                                {currentOptions ? amount * currentOptions[0].price : currentData[0].category_list[0].price} pуб.
                        </span>
            </Grid>
            <Button className={classes.root}>
                <span className={classes.span}>Оплатить</span>
            </Button>
            <Grid className="TotalPrice__Agreement">
                <Checkbox color="default"/>
                <Grid className="TotalPrice__Title">
                    Нажимая кнопку действия, Вы соглашаетесь с политикой возврата. Посмотреть подробную
                    информация.
                </Grid>
            </Grid>
        </Grid>
    )
}
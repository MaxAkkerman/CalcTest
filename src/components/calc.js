import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {useState} from "react";
import {useEffect} from "react";
import React from 'react';
import '../App.css';
import {makeStyles} from '@material-ui/core/styles';
import Header from "./Header.js";
import ModalView from "./Modal.js";
import OptionsList from "./OptionsList.js";
import Checkbox from '@material-ui/core/Checkbox';

const DefaultData = [{
    "category_name": "Раствор",
    "type": "м3",
    "category_id": "36",
    "category_list": [
        {id: "36", type: "м3", name: "М-100", price: "3500"},
        {id: "38", type: "м3", name: "М-150", price: "3700"},
        {id: "39", type: "м3", name: "М-200", price: "3900"},
    ]
}]

const useStyles = makeStyles({
    root: {
        "letter-spacing": "0px",
        "line-height": "32px",
        "color": "#fffefe",
        "text-align": "center",
        "font-size": "15px",
        "font-family": 'Circe, sans-serif',
        'width': '151px',
        'height': '36px',
        "border-radius": '8px',
        'background-color': '#0095f9',
        'margin-left': '34px',
        'margin-top': '18px',
    },
    span: {
        "position": "relative",
        "margin-top": "-4px",
    }
});

function Calc(props) {

    const classes = useStyles();
    const [currentData, setCurrentData] = useState(DefaultData)
    const [currentOptions, setCurrentOptions] = useState()
    const [amount, setAmount] = useState()
    const [option, setOptions] = useState("M-100")

    function handleCurrentData(data) {
        setCurrentData(data)
    }

    function handleCurrentOptions(options) {
        setCurrentOptions(options)
    }

    function handleAmount(amount) {
        setAmount(amount)
    }

    useEffect(() => {
        let defaultValueOnChange = currentData[0].category_list[0].name;
        setOptions(defaultValueOnChange)
        setCurrentOptions(DefaultData.category_list)
        setAmount(1)
    }, [currentData]);

    return (
        <Grid className="Calc">
            <ModalView/>
            <Header/>

            <Grid className="Calc__Container">
                <Grid className="Calc__OptionsList">
                    <OptionsList
                        defaultData={props.data[0]}
                        data={props.data}
                        handleCurrentData={(data) => handleCurrentData(data)}
                        handleCurrentOptions={(options) => handleCurrentOptions(options)}
                        handleAmount={(amount) => handleAmount(amount)}
                    />
                </Grid>
                <Grid className="Calc__TotalPrice">
                    <Grid className="Calc__TotalPrice__Header">
                        <Grid className="TotalPrice__Header__Title">
                            РАСЧЕТ
                        </Grid>
                        <Grid className="TotalPrice__Header__BottomLine"/>
                    </Grid>
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
                </Grid>

            </Grid>
        </Grid>
    );
}

export default Calc;





import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {useState} from "react";
import {useEffect} from "react";
import React from 'react';
import '../App.css';
import Header from "./Header.js";
import ModalView from "./Modal.js";
import SimpleModal from "./ModalBuy.js";
import OptionsList from "./OptionsList.js";
import SelectedDataView from "./SelectedDataView.js";
import defData from "./defaultDatttta.js"

const _ = require('lodash');

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
    let DATA = defData();

    const [normalizedData, setNormalizedData] = useState([]);
    const [defNorData, setDefaultNorData] = useState([]);
    const [optionsList, setOptionslist] = useState();
    const [modalState, setModal] = useState(false);

    function handleChangeData(data, id, value, optionsCurrent) {

        if (normalizedData.length === 1) {
            let changedData = JSON.parse(JSON.stringify(normalizedData));
            changedData[0][0].type = data[0].type;
            changedData[0][0].categoryName = data[0].category_name;
            changedData[0][0].currentOption = data[0].category_list[0].name;
            changedData[0][0].currenOptions = optionsCurrent;
            changedData[0][0].currentPrice = data[0].category_list[0].price;
            changedData[0][0].amount = 1;
            setNormalizedData(changedData);
        } else {
            let ui = JSON.parse(JSON.stringify(normalizedData));
            let iu = ui.filter(item => item[0].order === id);

            iu[0][0].categoryName = data[0].category_name;
            iu[0][0].currenOptions = optionsCurrent;
            iu[0][0].currentOption = data[0].category_list[0].name;
            iu[0][0].currentPrice = data[0].category_list[0].price;
            iu[0][0].amount = 1;
            iu[0][0].type = data[0].type;
            iu[0][1].map(item => {
                    item.selecteOpt = item.category_name === value;
                    return item
                }
            );
            let yu = iu[0][1].filter(item => item.category_name === value);
            yu[0].category_list.map(item => {
                    item.selecteOpt2 = item.name === data[0].category_list[0].name;
                    return item
                }
            );
            setNormalizedData(ui);
        }
    }

    function handleCurrentOptions(options, id, optionValue, currentSelector) {

        if (normalizedData.length === 1) {
            let changedData = JSON.parse(JSON.stringify(normalizedData));
            changedData[0][0].currentOption = optionValue || options[0].name;
            changedData[0][0].currentPrice = options.filter(item => item.name === optionValue)[0].price;
            setNormalizedData(changedData);
        } else {
            let ui = JSON.parse(JSON.stringify(normalizedData));
            let iu = ui.filter(item => item[0].order === id);
            iu[0][0].currentOption = optionValue || options[0].name;

            let xc = _.cloneDeep(iu[0][1]);
            let yu = xc.filter(item => item.category_name === currentSelector ? currentSelector : "Раствор");
            yu[0].category_list.map(item => {
                item.selecteOpt2 = item.name === optionValue;
                iu[0][0].currenOptions = options;
                setOptionslist(yu[0].category_list);
                return item
            });
            iu[0][0].currentPrice = options.filter(item => item.name === optionValue)[0].price;

            setNormalizedData(ui)
        }
    }

    useEffect(() => {
        let normalizedData = [DATA];
        normalizedData.unshift({
            currenOptions: optionsList ? optionsList : DATA[0].category_list,
            order: 0,
            categoryName: "Раствор",
            optionType: "м3",
            category_id: "36",
            currentOption: "M-100",
            currentPrice: DATA[0].category_list[0].price,
            amount: 1,
        });
        setNormalizedData([normalizedData]);
        setDefaultNorData(normalizedData);
    }, []);

    function handleAddNewItem() {
        let arrToHook = JSON.parse(JSON.stringify(normalizedData));
        let newValue = _.cloneDeep(defNorData);
        arrToHook.push(newValue);

        for (let i = 0; i < arrToHook.length; i++) {
            arrToHook[i][0].order = i;
        }
        setNormalizedData(arrToHook);
    }

    function totalPrice() {
        let total = 0;
        normalizedData.map(item => total += item[0].currentPrice * item[0].amount);
        return total
    }

    function handleCheck() {
        setModal(true)
    }

    function handleDeleteSelect(id) {
        let toDelete = [...normalizedData];
        if (toDelete.length === 1) {
            return
        }
        toDelete.splice(id, 1);

        setNormalizedData(toDelete);

    }

    function handleChangeAmount(e, id) {

        let qw = JSON.parse(JSON.stringify(normalizedData));
        let instrToReturn;
        if (qw[0][0].amount === 1 && e.currentTarget.value === "decrease") {
            instrToReturn = true;
        }
        if (normalizedData.length === 1) {
            if (instrToReturn) return;
            e.currentTarget.value === "increase"
                ?
                qw[0][0].amount = qw[0][0].amount + 1
                :
                qw[0][0].amount = qw[0][0].amount - 1;
        }
        if (normalizedData.length > 1) {
            if (instrToReturn) return;
            let wq = qw.filter(item => item[0].order === id);
            if (wq[0][0].amount === 1 && e.currentTarget.value === "decrease") return;
            e.currentTarget.value === "increase"
                ?
                wq[0][0].amount = wq[0][0].amount + 1
                :
                wq[0][0].amount = wq[0][0].amount - 1;
        }
        setNormalizedData(qw);
    }

    function handleCloseModal() {
        setModal(false)
    }

    function handleBuy() {
        // SimpleAlerts
    }

    return (
        <Grid className="Calc">
            <ModalView/>
            <Header/>
            <SimpleModal
                open={modalState}
                handleBuy={handleBuy}
                normalizedData={normalizedData}
                handleCloseModal={handleCloseModal}
            />
            <Grid className="Calc__Container">
                <Grid style={{"display": "flex", "flexDirection": "column"}}>

                    {normalizedData.map((item, i) =>
                        <Grid
                            key={i}
                            className="Calc__OptionsList">

                            <OptionsList
                                id={i}
                                data={item}
                                handleAddNewItem={(id) => handleAddNewItem(id)}
                                goodsAmount={normalizedData.length}
                                handleCurrentData={
                                    (data, id, value, optionsCurrent, curOption, type) =>
                                        handleChangeData(data, id, value, optionsCurrent, curOption, type)}
                                handleCurrentOptions={
                                    (options, id, optionValue, currentSelector) =>
                                        handleCurrentOptions(options, id, optionValue, currentSelector)}
                                handleDeleteSelectProps={(id) => handleDeleteSelect(id)}
                                handleChangeAmount={(e, id) => handleChangeAmount(e, id)}
                            />
                        </Grid>
                    )}
                </Grid>

                <Grid className="Calc__TotalPrice">
                    <Grid className="Calc__TotalPrice__Header">
                        <Grid className="TotalPrice__Header__Title">
                            РАСЧЕТ
                        </Grid>
                        <Grid className="TotalPrice__Header__BottomLine"/>
                    </Grid>
                    {normalizedData.map((item, i) =>
                        <SelectedDataView
                            key={i}
                            categoryName={item[0].categoryName}
                            categoryOption={item[0].currentOption}
                            amount={item[0].amount}
                            optionType={item[0].type}
                            optionPrice={item[0].currentPrice}
                        />
                    )}
                    <Grid className="TotalPrice__Price">
                        ИТОГО:
                        <span className="TotalPrice__PriceValue">
                                {totalPrice()} pуб.
                        </span>
                    </Grid>
                    <Button onClick={() => handleCheck()} className={classes.root}>
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
    );
}

export default Calc;





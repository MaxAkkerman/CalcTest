import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {useReducer} from "react";
import {useState} from "react";
import {useEffect} from "react";
import {useCallback} from "react";
import React from 'react';
import '../App.css';
import Header from "./Header.js";
import ModalView from "./Modal.js";
import OptionsList from "./OptionsList.js";
import SelectedDataView from "./SelectedDataView.js";
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
//DONT TOUCH
    const [amount, setAmount] = useState();

    const [selectedDataToView, setselectedDataToView] = useState([])

    const [newSelect, setNewSelect] = useState([])

    function handleCurrentData(data, id, value) {
        let currentDataToView = selectedDataToView;
        let findedExempl = currentDataToView.filter(item=> item.id === id);
                findedExempl[0].categoryName = value ? value : "HHHHHHH";
                findedExempl[0].categoryOption = data ? data[0].category_list[0].name : "HHHHH";
        currentDataToView.push(findedExempl[0])
        let applyData = _.uniqBy(currentDataToView, 'id');
            setselectedDataToView(applyData);




    }

    function handleCurrentOptions(options, id, value) {
        let AddOption = selectedDataToView;
        let AddOptionFiltered = AddOption.filter(item=>item.id === id);
            AddOptionFiltered[0].categoryOption = value ? value : "M-100";
        AddOption.push(AddOptionFiltered[0])
        let applyData = _.uniqBy(AddOption, 'id');

        setselectedDataToView(applyData)
        console.log("AddOptionFiltered", applyData)
    }

    function handleAmount(amount) {
        setAmount(amount)
    }

    useEffect(()=>{
        let restructuredData = [];
        let op = props.data;


        let yu = op[0];


        restructuredData.push(op);
        restructuredData[0].push({"order":1});
        // console.log("popoop", yu)
        console.log("yu", restructuredData)
        setNewSelect(restructuredData);
        let array = [];
        let obj = {};


        obj.id = 0;
        obj.categoryName = yu ? yu.category_name : "rexrf";
        obj.categoryOption = yu ? yu.category_list[0].name : "232323";
        obj.optionType = yu ? yu.category_list[0].type : "2323";
        obj.optionPrice = yu ? yu.category_list[0].price : "2323";
        array.push(obj);

        setselectedDataToView(array)
    console.log("propsdata changed")
    }, [props.data]);
    const handleChange = useCallback((addSelect) => {
        setNewSelect(prevState => {
            return new Map(prevState).set(addSelect,1);
        });
    }, []);
    function handleAddNewSelect(id) {
        //
        let addSelect = newSelect.slice(0);
        //
        let op = newSelect[0].slice(0);
        addSelect.push(op);

        // handleChange()
       setNewSelect((state)=>addSelect)
        console.log("here", addSelect, op)
        let currentDataToView = selectedDataToView;
        let obj = {};

        obj.id = currentDataToView.length;
        obj.categoryName = props.data[0].category_name;
        obj.categoryOption = props.data[0].category_list[0].name;
        obj.optionType = props.data[0].category_list[0].type;
        obj.optionPrice = props.data[0].category_list[0].price;
        currentDataToView.push(obj);
        let io = _.uniqBy(currentDataToView, 'id');
        setselectedDataToView(io);

        handleClickForceUpdate();
    }

    function handleCheck() {
        handleAddNewSelect()

        console.log("23232", newSelect)
    }
    function handleDeleteSelect(id){
        let data = newSelect.slice(0);
        data.splice(id, 1)

        console.log("23232", newSelect, id)
        setNewSelect((state)=>{return data})
        // handleClickForceUpdate()
    }

//DONT TOUCH
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    function handleClickForceUpdate() {
        forceUpdate();
    }

    return (
        <Grid className="Calc">
            <ModalView/>
            <Header/>
            {ignored}
            <Grid className="Calc__Container">
                <Grid style={{"display":"flex", "flex-direction":"column"}}>

                {newSelect.map((item,i) =>
                <Grid className="Calc__OptionsList">

                    <OptionsList
                        id={i}
                        data={item}
                        handleAddNewSelect={(id)=>handleAddNewSelect(id)}
                        handleCurrentData={(data,id,value) => handleCurrentData(data,id,value)}
                        handleCurrentOptions={(options,id, value) => handleCurrentOptions(options,id,value)}
                        handleAmount={(amount) => handleAmount(amount)}
                        handleDeleteSelectProps={(id)=>handleDeleteSelect(id)}
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
                    {selectedDataToView.map(item=>
                   <SelectedDataView
                    categoryName={item.categoryName}
                    categoryOption={item.categoryOption}
                    amount={"amount"}
                    optionType={item.optionType}
                    optionPrice={item.optionPrice}
                   />
                    )}
                    <Grid className="TotalPrice__Price">
                        ИТОГО:
                        <span className="TotalPrice__PriceValue">
                                {/*{totalPrice} pуб.*/}
                        </span>
                    </Grid>
                    <Button onClick={()=>handleCheck()} className={classes.root}>
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





import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect} from "react";
import {useState} from "react";
import React from "react";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles({
    root: {
        padding: '0 !important',
        minWidth: 0,
        height: 15,
        marginRight: 3,
        marginTop: 2,
    },

    text: {
        padding: 0
    }
});

function OptionsList(props) {
    const {data, id, handleDeleteSelectProps, handleAddNewItem, handleChangeAmount, handleCurrentData, handleCurrentOptions} = props;
    const classes = useStyles();

    const [type, setType] = useState("");
    const [categoryList, setCategoryList] = useState([{name: "M-100"}]);
    const [curOption, setCurrentOption] = useState("");
    const [currentSelector, setCurrentSelector] = useState("");

    useEffect(() => {
        let x = data[0].currentOption;
        let ui = data[0].currenOptions.map(item => {
            item.selecteOpt = item.name === x;
            return item
        });
        setCategoryList(ui);
    }, [data]);

    function handleChangeSelect(e) {
        let x = data[1].filter(item => item.category_name === e.target.value);
        let value = e.target.value;
        let optionsCurrent = x[0].category_list;

        setType(x[0].type);
        setCurrentSelector(value);
        handleCurrentData(x, id, value, optionsCurrent, curOption);
    }

    function handleChangeOption(e) {
        let optionValue = e.target.value;

        setCurrentOption(optionValue);
        handleCurrentOptions(categoryList, id, optionValue, currentSelector);
    }

    function handleAddNewSelect() {
        handleAddNewItem(id)
    }

    function handleDeleteSelect() {
        handleDeleteSelectProps(id)
    }

    function handleIncreaseAmount(e) {
        handleChangeAmount(e, props.id);
    }

    return (
        <>
            <Grid className='Calc__OptionsList__Container'
            >
                <span className="Calc__OptionsList__ChooseService">Выберите услугу</span>
                <span className="Calc__OptionsList__Unit">Ед.изм.</span>
            </Grid>

            <Grid
                className='Calc__OptionsList__Container2'
            >
                <select
                    defaultValue={data[0].categoryName}
                    children={
                        data[1].map(item => <option value={item.category_name}
                                                    selected={item.selecteOpt ? "selected" : ""}
                                                    key={item.category_name}>
                            {item.category_name}
                        </option>)
                    }
                    className="TextStyle"
                    onChange={(e) => handleChangeSelect(e)}
                >

                </select>
                <Grid className='Calc__OptionList__Type'>
                    {type ? type : "м3"}
                </Grid>
            </Grid>
            <Grid className='Calc__OptionsList__Container'>
                <span className="Calc__OptionsList__ChooseService2">Наименование</span>
                <span className="Calc__OptionsList__Unit">Кол-во</span>
            </Grid>
            <Grid className='Calc__OptionsList__Container2'>
                <select
                    className="TextStyle"
                    defaultValue={data[0].currentOption}
                    children={categoryList.map(item =>
                        <option value={item.name}
                                selected={item.selecteOpt ? "selected" : ""}
                                key={item.name}>
                            {item.name}
                        </option>)}
                    onChange={(e) => handleChangeOption(e)}
                >
                </select>
                <Grid className="AmountStylesContainer">
                    <Grid className="AmountStyles">
                        {data[0].amount}
                    </Grid>
                    <Button value={"increase"} onClick={(e) => handleIncreaseAmount(e)} classes={{
                        root: classes.root,
                        text: classes.text,
                    }}>
                        <ArrowDropUpIcon/>
                    </Button>
                    <Button value={"decrease"} onClick={(e) => handleIncreaseAmount(e)} classes={{
                        root: classes.root,
                        text: classes.text,
                    }}>
                        <ArrowDropDownIcon/>
                    </Button>
                </Grid>
            </Grid>
            <Grid className="Calc__AddService">
                <span onClick={() => handleAddNewSelect()}
                      className="Calc__AddService_AddBtn">Добавить еще позицию</span>
                <span onClick={() => handleDeleteSelect()} className="Calc__AddService_DelBtn">Удалить позицию</span>
            </Grid>
        </>
    )
}

export default OptionsList;
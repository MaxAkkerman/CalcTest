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
    const {data, id, handleDeleteSelectProps, handleCurrentData, handleAmount, handleCurrentOptions} = props;
    const classes = useStyles();

    const [type, setType] = useState("");
    const [categoryList, setCategoryList] = useState([{name: "M-100"}]);
    const [amount, setAmount] = useState(1);
    const [mounted, setMounted] = useState(true)

    useEffect(() => {
        handleAmount(amount)
    }, [amount]);
    function receiveData(){
        // let d = props.data ? props.data[0].category_list : "M-100";
        // return d
    }


        useEffect(() => {
            // Create an scoped async function in the hook
           //  async function anyNameFunction() {
           //      await receiveData();
           //  }
           //  // Execute the created function directly
           // anyNameFunction().then(data=> setCategoryList(data));
           //  // setCategoryList(x)
           //  console.log("xxxxxxxxxxx")
        }, []);

    function handleChangeSelect(e) {
        let x = data.filter(item => item.category_name === e.target.value);
        let value = e.target.value;

        setCategoryList(x[0].category_list);
        setAmount(1);
        setType(x[0].type);

        handleCurrentData(x, id, value);
    }



    function handleChangeOption(e) {
        let y = categoryList.filter(item => item.name === e.target.value);

        let value = e.target.value;
        handleCurrentOptions(y,id,value)

    }
    function handleAddNewSelect(){
        props.handleAddNewSelect(id)
    }
    function handleDeleteSelect(){
        handleDeleteSelectProps(props.id)
    }


//DONT TOUCH
    function handleIncreaseAmount() {
        setAmount(amount + 1)
        console.log(id)
    }

    function handleDecreaseAmount() {
        if (amount <= 1) {
            return
        }
        setAmount(amount - 1)
    }
    return (
        <>
            <Grid className='Calc__OptionsList__Container'
            >
                <span className="Calc__OptionsList__ChooseService">Выберите услугу</span>
                <span className="Calc__OptionsList__Unit">Ед.изм.</span>
            </Grid>

            <Grid className='Calc__OptionsList__Container2'>
                <select
                    children={
                        data.map(item => <option key={item.category_name}>{item.category_name}</option>)
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
                    onChange={(e) => handleChangeOption(e)}
                >
                    {categoryList.map(item => <option key={item.name}>{item.name}</option>)}
                </select>

                <Grid className="AmountStylesContainer">
                    <Grid className="AmountStyles">
                        {amount}
                    </Grid>
                    <Button onClick={() => handleIncreaseAmount()} classes={{
                        root: classes.root,
                        text: classes.text,
                    }}>
                        <ArrowDropUpIcon/>
                    </Button>
                    <Button onClick={() => handleDecreaseAmount()} classes={{
                        root: classes.root,
                        text: classes.text,
                    }}>
                        <ArrowDropDownIcon/>
                    </Button>
                </Grid>
            </Grid>
            <Grid className="Calc__AddService">
                <span onClick={()=>handleAddNewSelect()} className="Calc__AddService_AddBtn">Добавить еще позицию</span>
                <span onClick={()=>handleDeleteSelect()}className="Calc__AddService_DelBtn">Удалить позицию</span>
            </Grid>

        </>
    )
}

export default OptionsList;
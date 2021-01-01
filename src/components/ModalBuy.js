import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import SelectedDataView from "./SelectedDataView.js";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const handleClose = () => {
        props.handleCloseModal()
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Ваш заказ</h2>
            {props.normalizedData.map(item=>
                <SelectedDataView
                    key={item[0].amount}
                    categoryName={item[0].categoryName}
                    categoryOption={item[0].currentOption}
                    amount={item[0].amount}
                    optionType={item[0].type}
                    optionPrice={item[0].currentPrice}
                />
            )}
            <Button onClick={()=>props.handleBuy()} className={classes.root}>
                <span className={classes.span}>Заказать</span>
            </Button>

        </div>
    );

    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

import Grid from "@material-ui/core/Grid";
import React from 'react';
import '../App.css';

function Header() {

    return (
       <Grid className="Calc__Header">
                <Grid className="Calc__Header__Title">
                    Калькулятор
                </Grid>
                <Grid className="Calc__Header__BottomLine"/>
            </Grid>
    );
}

export default Header;





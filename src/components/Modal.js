import Grid from "@material-ui/core/Grid";
import Modal from '@material-ui/core/Modal';
import React from 'react';
import '../App.css';

export function ModalView(props){
    return (
        <Grid>
            <Modal
                style={{"margin-top":"100px"}}
                open={false}
                children={
                    <Grid className="ModalView">
                        <Grid>
                            Подтверждение заказа
                        </Grid>
                        asdsds
                    </Grid>

                }/>
        </Grid>
    )
}

export default ModalView;
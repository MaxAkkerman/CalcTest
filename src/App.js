import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {useState} from "react";
import {useEffect} from "react";
import React from 'react';
import './App.css';
import Calc from "./components/calc.js";

function App() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await axios(
                'https://beton.tesla.cloudtech.ltd/json.php',
            );
            let op = response.data;

            setData(op)
        }

        fetchData();
    }, []);

    return (
        <Grid className="App">
            <Calc
                data={data}
            />
        </Grid>
    );
}

export default App;

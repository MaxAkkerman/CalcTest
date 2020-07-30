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
            let restructuredData = [];
            let op = response.data;

            // restructuredData.push(op);
            // restructuredData[0].push({"order":1});
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

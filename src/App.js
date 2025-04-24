import React, { useEffect , useState } from 'react';
import './App.css';
import TableCsv from './Components/TableCsv';
import CSVReader from './Components/CSVReader'

function App() {
  return (
    <div>
      {/* <div>
        <h1>
          Dashboard
        </h1>
      </div> */}
      <div>
        {/* <TableCsv />  */}
        <CSVReader /> 
      </div>  
    </div>
  )

}

export default App;
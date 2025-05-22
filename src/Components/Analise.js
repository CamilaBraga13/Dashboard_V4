// import React from "react";
// import { useLocation } from "react-router-dom";
// import SerieSpeed from "./SerieSpeed"; // Importe o componente SerieSpeed
// import AnaliseGoodSpeed from "./AnaliseGoodSpeed"; // Importe o componente AnaliseGoodSpeed
// // import AnaliseArvores from "./AnaliseArvores"; // Importe o componente AnaliseArvores
// import CasasAbastecidas from "./CasasAbastecidas"

// import '../Styles/analise.css';
// import ChartHistogram from "./ChartHistogram";
// import SerieDirection from "./SerieDirection"; // Importe o componente SerieDirection

// function Analise() {
//     const location = useLocation();
//     //const csvData = location.state?.csvData || []; // Acessa os dados enviados pelo estado
//     const csvData = JSON.parse(localStorage.getItem("csvData"));
//     console.log("Dados recebidos no Analise:", csvData);
//     return (
//         <div className="analise-container">
//             <h1>Análise</h1>
//             <div className="analise-header">

//                 <div className="chart-analise">
//                     <AnaliseGoodSpeed data={csvData}/>
//                 </div>
//                 <div className="chart-container">
//                     <CasasAbastecidas data={csvData}/>
//                 </div>
//                 {/* <div class="chart-container">
//                     <AnaliseAgua data = {csvData}/>
//                 </div> */}
//             </div>
//         </div>
//     );
// }

// export default Analise;
// import React from "react";
// import AnaliseGoodSpeed from "./AnaliseGoodSpeed";
// import CasasAbastecidas from "./CasasAbastecidas";
// import ArvoresSalvas from "./ArvoresSalvas"; // Importe o componente AnaliseArvores
// import AguaEconomizada from "./AguaEconomizada"; // Importe o componente AnaliseArvores

// import '../Styles/analise.css';

// function Analise() {
//     let csvData = [];
//     try {
//         csvData = JSON.parse(localStorage.getItem("csvData")) || [];
//     } catch {
//         csvData = [];
//     }
//     console.log("Dados recebidos no Analise:", csvData);
    
//     return (
//         <div className="analise-container">
//         <h1>Análise</h1>
//         <div className="analise-header">
//             <div className="chart-analise">
//                 <AnaliseGoodSpeed data={csvData} />
//             </div>
//             <div className="chart-container">
//                 <CasasAbastecidas data={csvData} />
//             </div>
//             <div>
//                 <ArvoresSalvas data={csvData} />
//             </div>
//             <div>
//                 <AguaEconomizada data={csvData} />
//             </div>
//         </div>
//         </div>
//     );
// }

// export default Analise;

import React from "react";
import AnaliseGoodSpeed from "./AnaliseGoodSpeed";
import CasasAbastecidas from "./CasasAbastecidas";
import ArvoresSalvas from "./ArvoresSalvas";
import AguaEconomizada from "./AguaEconomizada";

import '../Styles/analise.css';

function Analise() {
    let csvData = [];
    try {
        csvData = JSON.parse(localStorage.getItem("csvData")) || [];
    } catch {
        csvData = [];
    }
    console.log("Dados recebidos no Analise:", csvData);

    return (
        <div className="analise-container">
            <h1 className="tituloAnalise">Produção Energética</h1>
            <div className="analise-content">
                <div className="analise-left">
                    <AnaliseGoodSpeed data={csvData} />
                </div>
                <div className="analise-right">
                    <CasasAbastecidas data={csvData} />
                    <ArvoresSalvas data={csvData} />
                    <AguaEconomizada data={csvData} />
                </div>
            </div>
        </div>
    );
}

export default Analise;
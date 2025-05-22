// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { Bar } from "react-chartjs-2"; // Biblioteca para gráficos de barras
// import SerieSpeed from "./SerieSpeed";
// import ChartHistogram from "./ChartHistogram";
// import SerieDirection from "./SerieDirection";
// import "../Styles/analise.css";

// function AnaliseGoodSpeed() {
//   const location = useLocation();
//   const csvData = location.state?.csvData; // Acessa os dados enviados pelo estado
//   const [timeAboveThreshold, setTimeAboveThreshold] = useState([]);

//   useEffect(() => {
//     if (csvData) {
//       // Filtra os dados onde a velocidade é maior que 4 m/s
//       const filteredData = csvData.filter((row) => row.ws100 > 4);

//       // Agrupa os dados por dia e calcula o tempo total
//       const groupedData = filteredData.reduce((acc, row) => {
//         const date = new Date(row.time).toISOString().split("T")[0]; // Extrai apenas a data (YYYY-MM-DD)
//         acc[date] = (acc[date] || 0) + 10; // Incrementa 10 minutos (assumindo intervalos de 10 minutos)
//         return acc;
//       }, {});

//       // Converte o objeto agrupado em um array para o gráfico
//       const chartData = Object.entries(groupedData).map(([date, time]) => ({
//         date,
//         time: time / 60, // Converte minutos para horas
//       }));

//       setTimeAboveThreshold(chartData);
//     }
//   }, [csvData]);

//   return (
//     <div className="GoodSpeed-container">
//       <h1>Análise</h1>
//       <div className="analise-header">
//         <div className="chart-analise">
//           <SerieSpeed data={csvData} />
//         </div>
//         <div className="chart-container">
//           <SerieDirection data={csvData} />
//         </div>
//         <div className="chart-container">
//           <ChartHistogram data={csvData} />
//         </div>
//         <div className="chart-container">
//           <h2>Tempo por Dia com Velocidade > 4 m/s</h2>
//           {timeAboveThreshold.length > 0 ? (
//             <Bar
//               data={{
//                 labels: timeAboveThreshold.map((item) => item.date),
//                 datasets: [
//                   {
//                     label: "Horas com Velocidade > 4 m/s",
//                     data: timeAboveThreshold.map((item) => item.time),
//                     backgroundColor: "rgba(75, 192, 192, 0.6)",
//                     borderColor: "rgba(75, 192, 192, 1)",
//                     borderWidth: 1,
//                   },
//                 ],
//               }}
//               options={{
//                 responsive: true,
//                 scales: {
//                   x: {
//                     title: {
//                       display: true,
//                       text: "Data",
//                     },
//                   },
//                   y: {
//                     title: {
//                       display: true,
//                       text: "Horas",
//                     },
//                     beginAtZero: true,
//                   },
//                 },
//               }}
//             />
//           ) : (
//             <p>Nenhum dado disponível para velocidades acima de 4 m/s.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AnaliseGoodSpeed;
// import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// function AnaliseGoodSpeed({ data }) {
//   const [chartOptions, setChartOptions] = useState(null);

//   useEffect(() => {
//     if (data) {
//       // Filtra os dados onde a velocidade é maior que 4 m/s
//       const filteredData = data.filter((row) => row.ws100 > 4);

//       // Agrupa os dados por dia e calcula o tempo total
//       const groupedData = filteredData.reduce((acc, row) => {
//         // Verifica se o valor de time é válido
//         const dateValue = new Date(row.time);
//         if (isNaN(dateValue.getTime())) {
//           console.warn(`Valor de time inválido: ${row.time}`);
//           return acc; // Ignora registros com valores inválidos
//         }

//         const date = dateValue.toISOString().split("T")[0]; // Extrai apenas a data (YYYY-MM-DD)
//         acc[date] = (acc[date] || 0) + 10; // Incrementa 10 minutos (assumindo intervalos de 10 minutos)
//         return acc;
//       }, {});

//       // Converte o objeto agrupado em um array para o gráfico
//       const chartData = Object.entries(groupedData).map(([date, time]) => ({
//         date,
//         time: time / 60, // Converte minutos para horas
//       }));

//       // Configurações do gráfico Highcharts
//       setChartOptions({
//         chart: {
//           type: "column",
//         },
//         title: {
//           text: "Tempo por Dia com Velocidade > 4 m/s",
//         },
//         xAxis: {
//           categories: chartData.map((item) => item.date),
//           title: {
//             text: "Data",
//           },
//         },
//         yAxis: {
//           min: 0,
//           title: {
//             text: "Horas",
//           },
//         },
//         series: [
//           {
//             name: "Horas com Velocidade > 4 m/s",
//             data: chartData.map((item) => item.time),
//             color: "rgba(75, 192, 192, 0.6)",
//           },
//         ],
//       });
//     }
//   }, [data]);

//   return (
//     <div>
//       <h2>Tempo por Dia com Velocidade  4 m/s</h2>
//       {chartOptions ? (
//         <HighchartsReact highcharts={Highcharts} options={chartOptions} />
//       ) : (
//         <p>Nenhum dado disponível para velocidades acima de 4 m/s.</p>
//       )}
//     </div>
//   );
// }

// export default AnaliseGoodSpeed;

// funciona
// import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { useLocation, useNavigate } from "react-router-dom";

// function AnaliseGoodSpeed() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const data = location.state?.csvData || []; // Acessa os dados enviados ou define como um array vazio
//   const [chartOptions, setChartOptions] = useState(null);

//   useEffect(() => {
//     if (!data || data.length === 0) {
//       console.warn("Nenhum dado recebido. Redirecionando para a página inicial.");
//       navigate("/"); // Redireciona para a página inicial ou outra rota
//       return;
//     }

//     console.log("Dados recebidos no AnaliseGoodSpeed:", data);

//     // Filtra os dados onde a velocidade é maior que 4 m/s
//     const filteredData = data.filter((row) => parseFloat(row.ws100) > 10);

//     // Agrupa os dados por dia e calcula o tempo total
//     const groupedData = filteredData.reduce((acc, row) => {
//       const dateValue = new Date(row.id);
//       if (isNaN(dateValue.getTime())) {
//         console.warn(`Valor de id inválido: ${row.id}`);
//         return acc;
//       }

//       const date = dateValue.toISOString().split("T")[0];
//       acc[date] = (acc[date] || 0) + 10; // Incrementa 10 minutos
//       return acc;
//     }, {});

//     // Converte o objeto agrupado em um array para o gráfico
//     const chartData = Object.entries(groupedData).map(([date, time]) => ({
//       date,
//       time: time / 60, // Converte minutos para horas
//     }));

//     // Configurações do gráfico Highcharts
//     setChartOptions({
//       chart: {
//         type: "column",
//       },
//       title: {
//         text: "Tempo por Dia com Velocidade > 4 m/s",
//       },
//       xAxis: {
//         categories: chartData.map((item) => item.date),
//         title: {
//           text: "Data",
//         },
//       },
//       yAxis: {
//         min: 0,
//         title: {
//           text: "Horas",
//         },
//       },
//       series: [
//         {
//           name: "Horas com Velocidade > 4 m/s",
//           data: chartData.map((item) => item.time),
//           color: "rgba(75, 192, 192, 0.6)",
//         },
//       ],
//     });
//   }, [data, navigate]);

//   return (
//     <div>
//       <h2>Tempo por Dia com Velocidade  4 m/s</h2>
//       {chartOptions ? (
//         <HighchartsReact highcharts={Highcharts} options={chartOptions} />
//       ) : (
//         <p>Nenhum dado disponível para velocidades acima de 4 m/s.</p>
//       )}
//     </div>
//   );
// }

// export default AnaliseGoodSpeed;

// import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { useLocation, useNavigate } from "react-router-dom";

// function AnaliseGoodSpeed() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const data = location.state?.csvData || []; // Acessa os dados enviados ou define como um array vazio
//   const [chartOptions, setChartOptions] = useState(null);
//   const [totalHours, setTotalHours] = useState(0); // Estado para armazenar o tempo total em horas

//   useEffect(() => {
//     if (!data || data.length === 0) {
//       console.warn("Nenhum dado recebido. Redirecionando para a página inicial.");
//       navigate("/"); // Redireciona para a página inicial ou outra rota
//       return;
//     }

//     console.log("Dados recebidos no AnaliseGoodSpeed:", data);

//     // Filtra os dados onde a velocidade é maior que 4 m/s
//     const filteredData = data.filter((row) => parseFloat(row.ws100) > 4);

//     // Calcula o tempo total em minutos
//     const totalMinutes = filteredData.length * 10; // Cada registro representa 10 minutos
//     const totalHours = totalMinutes / 60; // Converte minutos para horas
//     setTotalHours(totalHours); // Atualiza o estado com o tempo total em horas

//     // Agrupa os dados por dia e calcula o tempo total por dia
//     const groupedData = filteredData.reduce((acc, row) => {
//       const dateValue = new Date(row.id);
//       if (isNaN(dateValue.getTime())) {
//         console.warn(`Valor de id inválido: ${row.id}`);
//         return acc;
//       }

//       const date = dateValue.toISOString().split("T")[0];
//       acc[date] = (acc[date] || 0) + 10; // Incrementa 10 minutos
//       return acc;
//     }, {});

//     // Converte o objeto agrupado em um array para o gráfico
//     const chartData = Object.entries(groupedData).map(([date, time]) => ({
//       date,
//       time: time / 60, // Converte minutos para horas
//     }));

//     // Configurações do gráfico Highcharts
//     setChartOptions({
//       chart: {
//         type: "column",
//       },
//       title: {
//         text: "Tempo por Dia com Velocidade > 4 m/s",
//       },
//       xAxis: {
//         categories: chartData.map((item) => item.date),
//         title: {
//           text: "Data",
//         },
//       },
//       yAxis: {
//         min: 0,
//         title: {
//           text: "Horas",
//         },
//       },
//       series: [
//         {
//           name: "Horas com Velocidade > 4 m/s",
//           data: chartData.map((item) => item.time),
//           color: "rgba(75, 192, 192, 0.6)",
//         },
//       ],
//     });
//   }, [data, navigate]);

//   return (
//     <div>
//       <h2>Tempo por Dia com Velocidade  4 m/s</h2>
//       {/* Exibe o tempo total de forma dinâmica */}
//       <p>
//         <strong>Tempo total com velocidade  4 m/s:</strong>{" "}
//         {totalHours.toFixed(2)} horas
//       </p>
//       {chartOptions ? (
//         <HighchartsReact highcharts={Highcharts} options={chartOptions} />
//       ) : (
//         <p>Nenhum dado disponível para velocidades acima de 4 m/s.</p>
//       )}
//     </div>
//   );
// }

// export default AnaliseGoodSpeed; miózin

// import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { useNavigate } from "react-router-dom";

// function AnaliseGoodSpeed() {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [chartOptions, setChartOptions] = useState(null);
//   const [totalHours, setTotalHours] = useState(0);

//   useEffect(() => {
//     // Decodifica os dados da URL
//     const query = new URLSearchParams(window.location.search);
//     const csvData = query.get("data") ? JSON.parse(decodeURIComponent(query.get("data"))) : null;

//     if (!csvData || csvData.length === 0) {
//       console.warn("Nenhum dado recebido. Redirecionando para a página inicial.");
//       navigate("/"); // Redireciona para a página inicial
//       return;
//     }

//     setData(csvData);

//     // Filtra os dados onde a velocidade é maior que 4 m/s
//     const filteredData = csvData.filter((row) => parseFloat(row.ws100) > 4);

//     // Calcula o tempo total em minutos
//     const totalMinutes = filteredData.length * 10; // Cada registro representa 10 minutos
//     const totalHours = totalMinutes / 60; // Converte minutos para horas
//     setTotalHours(totalHours);

//     // Agrupa os dados por dia e calcula o tempo total por dia
//     const groupedData = filteredData.reduce((acc, row) => {
//       const dateValue = new Date(row.id);
//       if (isNaN(dateValue.getTime())) {
//         console.warn(`Valor de id inválido: ${row.id}`);
//         return acc;
//       }

//       const date = dateValue.toISOString().split("T")[0];
//       acc[date] = (acc[date] || 0) + 10; // Incrementa 10 minutos
//       return acc;
//     }, {});

//     // Converte o objeto agrupado em um array para o gráfico
//     const chartData = Object.entries(groupedData).map(([date, time]) => ({
//       date,
//       time: time / 60, // Converte minutos para horas
//     }));

//     // Configurações do gráfico Highcharts
//     setChartOptions({
//       chart: {
//         type: "column",
//       },
//       title: {
//         text: "Tempo por Dia com Velocidade > 4 m/s",
//       },
//       xAxis: {
//         categories: chartData.map((item) => item.date),
//         title: {
//           text: "Data",
//         },
//       },
//       yAxis: {
//         min: 0,
//         title: {
//           text: "Horas",
//         },
//       },
//       series: [
//         {
//           name: "Horas com Velocidade > 4 m/s",
//           data: chartData.map((item) => item.time),
//           color: "rgba(75, 192, 192, 0.6)",
//         },
//       ],
//     });
//   }, [navigate]);

//   return (
//     <div>
//       <h2>Tempo por Dia com Velocidade &gt; 4 m/s</h2>
//       <p>
//         <strong>Tempo total com velocidade &gt; 4 m/s:</strong> {totalHours.toFixed(2)} horas
//       </p>
//       {chartOptions ? (
//         <HighchartsReact highcharts={Highcharts} options={chartOptions} />
//       ) : (
//         <p>Nenhum dado disponível para velocidades acima de 4 m/s.</p>
//       )}
//     </div>
//   );
// }

// export default AnaliseGoodSpeed;

// ta quase :) 
// esse funciona mas o grafico nao muda
// mas a conta retorna valor :) 
// import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { useNavigate } from "react-router-dom";
// // import ArvoresSalvas from "./ArvoresSalvas"; // Importe o componente ArvoresSalvas   

// function AnaliseGoodSpeed() {
//     const navigate = useNavigate();
//     const [data, setData] = useState([]);
//     const [chartOptions, setChartOptions] = useState(null);
//     const [totalTime, setTotalTime] = useState(0);
//     const csvData = JSON.parse(localStorage.getItem("csvData"));
    
//     useEffect(() => {
//         console.log("AAAAAAAAAAAAAA",csvData);
//         if (!csvData || csvData.length === 0) {
//         console.warn("Nenhum dado recebido. Redirecionando para a página inicial.");
//         navigate("/"); // Redireciona para a página inicial
//         return;
//         }
    
//         setData(csvData);
//         console.log("Aqui", data);
//         // Filtra os dados onde a velocidade é maior que 4 m/s
//         const filteredData = csvData.filter((row) => parseFloat(row.ws100) > 10);
    
//         // Calcula o tempo total em minutos
//         const totalMinutes = filteredData.length * 10; // Cada registro representa 10 minutos
//         const totalHours = totalMinutes / 60; // Converte minutos para horas
//         const totalDays = Math.floor(totalHours / 24); // Calcula o total de dias
//         const remainingHours = totalHours % 24; // Calcula as horas restantes
    
//         // formata o total de horas em dias e horas
//         const formattedTotalTime = `${totalDays} dias e ${remainingHours.toFixed(2)} horas`;
//         setTotalTime(formattedTotalTime); // Atualiza o estado com o tempo total formatado


//     // Agrupa os dados por dia e calcula o tempo total por dia
//         const groupedData = filteredData.reduce((acc, row) => {
//         const dateValue = new Date(row.id);
//         if (isNaN(dateValue.getTime())) {
//             console.warn(`Valor de id inválido: ${row.id}`);
//             return acc;
//         }
    
//         const date = dateValue.toISOString().split("T")[0];
//         acc[date] = (acc[date] || 0) + 10; // Incrementa 10 minutos
//         return acc;
//         }, {});
    
//         // Converte o objeto agrupado em um array para o gráfico
//         const chartData = Object.entries(groupedData).map(([date, time]) => ({
//         date,
//         time: time / 60, // Converte minutos para horas
//         }));
    
//         // Configurações do gráfico Highcharts
//         setChartOptions({
//         chart: {
//             type: "column",
//             zoomType: "x",
//         },
//         title: {
//             text: "Tempo por Dia com Velocidade > 4 m/s",
//         },
//         xAxis: {
//             categories: chartData.map((item) => item.date),
//             title: {
//             text: "Data",
//             },
//         },
//         yAxis: {
//             min: 0,
//             title: {
//             text: "Horas",
//             },
//         },
//         series: [
//             {
//             //name: "Horas com Velocidade > 4 m/s",
//             data: chartData.map((item) => item.time),
//             color: "rgba(75, 192, 192, 0.6)",
//             },
//         ],
//         });
//     }, [navigate]);

//     return (
//         <div>
//             <h2>Tempo por Dia com Velocidade &gt; 4 m/s</h2>
//             <p>
//                 <strong>Tempo total com velocidade &gt; 4 m/s:</strong> {totalTime} 
//             </p>
//             {chartOptions ? (
//                 <HighchartsReact highcharts={Highcharts} options={chartOptions} />
//             ) : (
//                 <p>Nenhum dado disponível para velocidades acima de 4 m/s.</p>
//             )}
//         </div>
//     );
// }

// export default AnaliseGoodSpeed;

// import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// function AnaliseGoodSpeed({ data }) {
//   const [chartOptions, setChartOptions] = useState(null);
//   const [totalTime, setTotalTime] = useState(0);

//   useEffect(() => {
//     if (!Array.isArray(data) || data.length === 0) {
//       setChartOptions(null);
//       setTotalTime(0);
//       return;
//     }

//     // Filtra os dados onde a velocidade é maior que 4 m/s
//     const filteredData = data.filter((row) => parseFloat(row.ws100) > 4);

//     // Calcula o tempo total em minutos
//     const totalMinutes = filteredData.length * 10;
//     const totalHours = totalMinutes / 60;
//     const totalDays = Math.floor(totalHours / 24);
//     const remainingHours = totalHours % 24;
//     const formattedTotalTime = `${totalDays} dias e ${remainingHours.toFixed(2)} horas`;
//     setTotalTime(formattedTotalTime);

//     // Agrupa os dados por dia
//     const groupedData = filteredData.reduce((acc, row) => {
//       const dateValue = new Date(row.id);
//       if (isNaN(dateValue.getTime())) return acc;
//       const date = dateValue.toISOString().split("T")[0];
//       acc[date] = (acc[date] || 0) + 10;
//       return acc;
//     }, {});

//     const chartData = Object.entries(groupedData).map(([date, time]) => ({
//       date,
//       time: time / 60,
//     }));

//     setChartOptions({
//       chart: { type: "column", zoomType: "x" },
//       title: { text: "Tempo por Dia com Velocidade > 4 m/s" },
//       xAxis: {
//         categories: chartData.map((item) => item.date),
//         title: { text: "Data" },
//       },
//       yAxis: {
//         min: 0,
//         title: { text: "Horas" },
//       },
//       series: [
//         {
//           data: chartData.map((item) => item.time),
//           color: "rgba(7, 66, 230, 0.6)",
//         },
//       ],
//     });
//   }, [data]);

//   return (
//     <div>
//       <h2>Tempo por Dia com Velocidade &gt; 4 m/s</h2>
//       <p>
//         <strong>Tempo total com velocidade &gt; 4 m/s:</strong> {totalTime}
//       </p>
//       {chartOptions ? (
//         <HighchartsReact highcharts={Highcharts} options={chartOptions} />
//       ) : (
//         <p>Nenhum dado disponível para velocidades acima de 4 m/s.</p>
//       )}
//     </div>
//   );
// }

// export default AnaliseGoodSpeed;
// esse de cima funfa certin
// de baixo e com as classes de estilo
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "../Styles/analise.css"; // Importe o arquivo CSS para estilização

function AnaliseGoodSpeed({ data }) {
  const [chartOptions, setChartOptions] = useState(null);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      setChartOptions(null);
      setTotalTime(0);
      return;
    }

    const filteredData = data.filter((row) => parseFloat(row.ws100) > 4);
    const totalMinutes = filteredData.length * 10;
    const totalHours = totalMinutes / 60;
    const totalDays = Math.floor(totalHours / 24);
    const remainingHours = totalHours % 24;
    const formattedTotalTime = `${totalDays} dias e ${remainingHours.toFixed(2)} horas`;
    setTotalTime(formattedTotalTime);

    const groupedData = filteredData.reduce((acc, row) => {
      const dateValue = new Date(row.id);
      if (isNaN(dateValue.getTime())) return acc;
      const date = dateValue.toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 10;
      return acc;
    }, {});

    const chartData = Object.entries(groupedData).map(([date, time]) => ({
      date,
      time: time / 60,
    }));

    setChartOptions({
      chart: { type: "column", zoomType: "x" },
      title: { text: "Tempo por Dia com Velocidade > 4 m/s" },
      xAxis: {
        categories: chartData.map((item) => item.date),
        title: { text: "Data" },
      },
      yAxis: {
        min: 0,
        title: { text: "Horas" },
      },
      series: [
        {
          data: chartData.map((item) => item.time),
          color: "rgba(7, 94, 26, 0.6)",
        },
      ],
    });
  }, [data]);

  return (
    <div className="analisegoodspeed-container">
      <h2>Tempo por Dia com Velocidade &gt; 4 m/s</h2>
      <p>
        <strong>Tempo total com velocidade &gt; 4 m/s:</strong> {totalTime}
      </p>
      {chartOptions ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        <p>Nenhum dado disponível para velocidades acima de 4 m/s.</p>
      )}
    </div>
  );
}

export default AnaliseGoodSpeed;
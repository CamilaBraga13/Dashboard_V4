// import React from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import HighchartsMore from "highcharts/highcharts-more";

// // Ativar o módulo Highcharts-more para gráficos polares
// if (typeof HighchartsMore === "function") {
//   HighchartsMore(Highcharts);
// }

// const SpiralChart = ({ data }) => {
//   // Processar os dados para o formato polar
//   const processedData = data
//     .map((row) => {
//       // Verificar se a linha é válida e possui as propriedades esperadas
//       if (!row || !row.id || !row.ws100) {
//         console.warn("Linha inválida encontrada e ignorada:", row);
//         return null;
//       }

//       try {
//         // Extrair a hora do dia a partir do timestamp
//         const timestamp = row.id; // Ex.: "2021-09-16 18:10:00.000004"
//         const timeParts = timestamp.split(" ")[1].split(":"); // ["18", "10", "00.000004"]
//         const hour = parseInt(timeParts[0], 10); // Hora (18)
//         const minute = parseInt(timeParts[1], 10); // Minuto (10)

//         // Calcular o ângulo (0 a 360°) com base na hora e minuto
//         const angle = (hour + minute / 60) * (360 / 24);

//         // Usar o valor de ws100 como o raio
//         const radius = parseFloat(row.ws100); // Ex.: 8.64

//         return [angle, radius];
//       } catch (error) {
//         console.error("Erro ao processar a linha:", row, error);
//         return null;
//       }
//     })
//     .filter((point) => point !== null); // Remover pontos inválidos

//   const options = {
//     chart: {
//       polar: true, // Ativar coordenadas polares
//       type: "line", // Tipo de gráfico
//     },
//     title: {
//       text: "Gráfico em Espiral - Velocidade do Vento",
//     },
//     pane: {
//       size: "95%", // Tamanho do gráfico
//     },
//     xAxis: {
//       tickInterval: 360 / 24, // Dividir o círculo em 24 horas
//       min: 0,
//       max: 360,
//       labels: {
//         format: "{value}°",
//       },
//     },
//     yAxis: {
//       min: 0,
//       labels: {
//         format: "{value} m/s",
//       },
//     },
//     series: [
//       {
//         name: "Velocidade do Vento",
//         data: processedData,
//         tooltip: {
//           pointFormat: "Velocidade: <b>{point.y} m/s</b><br/>Ângulo: {point.x}°",
//         },
//       },
//     ],
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default SpiralChart;

// ficou expiral td bugado ^^^^^^
// 

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";

// Ativar o módulo Highcharts-more para gráficos polares
if (typeof HighchartsMore === "function") {
  HighchartsMore(Highcharts);
}

const SpiralChart = ({ data }) => {
  // Processar os dados para o formato polar
  const processedData = data.map((row) => {
    if (!row || !row.id || !row.ws100) {
      console.warn("Linha inválida encontrada e ignorada:", row);
      return null;
    }

    try {
      // Extrair a data e hora do timestamp
      const timestamp = row.id; // Ex.: "2021-09-16 18:10:00.000004"
      const [datePart, timePart] = timestamp.split(" "); // ["2021-09-16", "18:10:00.000004"]
      const [year, month, day] = datePart.split("-").map(Number); // [2021, 9, 16]
      const [hour, minute] = timePart.split(":").map((t) => parseInt(t, 10)); // [18, 10]

      // Calcular o ângulo (0 a 360°) com base no dia do mês
      const angle = ((day - 1) + (hour / 24)) * (360 / 30); // Aproximar 30 dias por mês

      // Usar o valor de ws100 como o raio
      const radius = parseFloat(row.ws100); // Ex.: 8.64

      return { angle, radius, value: radius };
    } catch (error) {
      console.error("Erro ao processar a linha:", row, error);
      return null;
    }
  }).filter((point) => point !== null); // Remover pontos inválidos

  const options = {
    chart: {
      polar: true, // Ativar coordenadas polares
      type: "column", // Tipo de gráfico: barras
    },
    title: {
      text: "Gráfico em Espiral - Velocidade do Vento por Mês",
    },
    pane: {
      size: "95%", // Tamanho do gráfico
    },
    xAxis: {
      tickInterval: 360 / 30, // Dividir o círculo em 30 dias
      min: 0,
      max: 360,
      labels: {
        format: "{value}°",
      },
    },
    yAxis: {
      min: 0,
      labels: {
        format: "{value} m/s",
      },
    },
    colorAxis: {
      min: Math.min(...processedData.map((d) => d.value)),
      max: Math.max(...processedData.map((d) => d.value)),
      stops: [
        [0, "#3060cf"], // Azul para velocidades baixas
        [0.5, "#fffbbc"], // Amarelo para velocidades médias
        [1, "#c4463a"], // Vermelho para velocidades altas
      ],
    },
    series: [
      {
        name: "Velocidade do Vento",
        data: processedData.map((point) => ({
          x: point.angle, // Ângulo
          y: point.radius, // Raio
          colorValue: point.value, // Valor para determinar a cor
        })),
        tooltip: {
          pointFormat:
            "Velocidade: <b>{point.y} m/s</b><br/>Ângulo: {point.x}°",
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SpiralChart;

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
//   const processedData = data.map((row) => {
//     if (!row || !row.id || !row.ws100) {
//       console.warn("Linha inválida encontrada e ignorada:", row);
//       return null;
//     }

//     try {
//       // Extrair a data e hora do timestamp
//       const timestamp = row.id; // Ex.: "2021-09-16 18:10:00.000004"
//       const [datePart, timePart] = timestamp.split(" "); // ["2021-09-16", "18:10:00.000004"]
//       const [year, month, day] = datePart.split("-").map(Number); // [2021, 9, 16]
//       const [hour, minute] = timePart.split(":").map((t) => parseInt(t, 10)); // [18, 10]

//       // Calcular o ângulo (0 a 360°) com base no dia do mês
//       const angle = ((day - 1) + (hour / 24)) * (360 / 30); // Aproximar 30 dias por mês

//       // Usar o valor de ws100 como o raio
//       const radius = parseFloat(row.ws100); // Ex.: 8.64

//       return { angle, radius, value: radius };
//     } catch (error) {
//       console.error("Erro ao processar a linha:", row, error);
//       return null;
//     }
//   }).filter((point) => point !== null); // Remover pontos inválidos

//   const options = {
//     chart: {
//       polar: true, // Ativar coordenadas polares
//       type: "column", // Tipo de gráfico: barras
//     },
//     title: {
//       text: "Gráfico em Espiral - Velocidade do Vento por Mês",
//     },
//     pane: {
//       size: "95%", // Tamanho do gráfico
//     },
//     xAxis: {
//       tickInterval: 360 / 30, // Dividir o círculo em 30 dias
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
//     colorAxis: {
//       min: Math.min(...processedData.map((d) => d.value)),
//       max: Math.max(...processedData.map((d) => d.value)),
//       stops: [
//         [0, "#3060cf"], // Azul para velocidades baixas
//         [0.5, "#fffbbc"], // Amarelo para velocidades médias
//         [1, "#c4463a"], // Vermelho para velocidades altas
//       ],
//     },
//     series: [
//       {
//         name: "Velocidade do Vento",
//         data: processedData.map((point) => ({
//           x: point.angle, // Ângulo
//           y: point.radius, // Raio
//           colorValue: point.value, // Valor para determinar a cor
//         })),
//         tooltip: {
//           pointFormat:
//             "Velocidade: <b>{point.y} m/s</b><br/>Ângulo: {point.x}°",
//         },
//       },
//     ],
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default SpiralChart;

// import React from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import HighchartsMore from "highcharts/highcharts-more";

// // Ativar o módulo Highcharts-more para gráficos polares
// if (typeof HighchartsMore === "function") {
//   HighchartsMore(Highcharts);
// }

// const SpiralChart = ({ data }) => {
//   // Processar os dados para o formato polar espiral
//   // Cada ponto terá: x (ângulo), y (raio), colorValue (velocidade)
//   const processedData = data
//     .map((row, idx) => {
//       if (!row || !row.id || !row.ws100) return null;
//       try {
//         // Exemplo: "2021-09-16 18:10:00.000004"
//         const [datePart, timePart] = row.id.split(" ");
//         const [year, month, day] = datePart.split("-").map(Number);
//         const [hour, minute] = timePart.split(":").map((t) => parseInt(t, 10));
//         // Espiral: cada ponto avança no ângulo e no raio conforme o tempo
//         // Ângulo: cada registro avança um pouco (exemplo: 10 minutos = 1/144 do círculo)
//         const totalMinutes = hour * 60 + minute;
//         const angle = ((day - 1) * 24 * 60 + totalMinutes) * (360 / (30 * 24 * 60));
//         // Raio: pode ser proporcional ao mês ou ao índice para dar efeito de espiral
//         const baseRadius = 30; // Raio mínimo
//         const spiralStep = 0.5; // Quanto o raio cresce a cada ponto
//         const radius = baseRadius + spiralStep * idx;
//         const value = parseFloat(row.ws100);
//         return { x: angle, y: radius, colorValue: value };
//       } catch {
//         return null;
//       }
//     })
//     .filter((point) => point !== null);

//   // Definir limites para o heatmap
//   const minValue = Math.min(...processedData.map((d) => d.colorValue));
//   const maxValue = Math.max(...processedData.map((d) => d.colorValue));

//   const options = {
//     chart: {
//       polar: true,
//       type: "column",
//       backgroundColor: "#fff",
//     },
//     title: {
//       text: "Espiral de Velocidade do Vento (Heatmap)",
//     },
//     pane: {
//       size: "95%",
//     },
//     xAxis: {
//       min: 0,
//       max: 360,
//       tickInterval: 30,
//       labels: { format: "{value}°" },
//     },
//     yAxis: {
//       min: 0,
//       endOnTick: false,
//       showLastLabel: true,
//       labels: { enabled: false },
//       gridLineWidth: 0,
//     },
//     tooltip: {
//       headerFormat: "",
//       pointFormat:
//         "Velocidade: <b>{point.colorValue} m/s</b><br/>Ângulo: {point.x}°<br/>Raio: {point.y}",
//     },
//     colorAxis: {
//       min: minValue,
//       max: maxValue,
//       stops: [
//         [0, "#3060cf"],    // Azul para velocidades baixas
//         [0.5, "#fffbbc"],  // Amarelo para médias
//         [1, "#c4463a"],    // Vermelho para altas
//       ],
//     },
//     series: [
//       {
//         name: "Velocidade do Vento",
//         data: processedData,
//         pointPlacement: "on",
//         colorKey: "colorValue",
//         borderWidth: 0,
//         groupPadding: 0,
//         pointPadding: 0,
//         shadow: false,
//       },
//     ],
//     credits: { enabled: false },
//     legend: { enabled: false },
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default SpiralChart;

// import React from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import HighchartsMore from "highcharts/highcharts-more";

// // Ativar o módulo Highcharts-more para gráficos polares/cartesianos avançados
// if (typeof HighchartsMore === "function") {
//   HighchartsMore(Highcharts);
// }

// function SpiralChart({ data }) {
//   // Parâmetros da espiral
//   const a = 1;      // Constante da espiral
//   const b = 0.7;    // Espaçamento entre voltas

//   // Se não houver dados, retorna null
//   if (!data || data.length === 0) return null;

//   // 1. Calcule o ângulo para cada ponto (em radianos)
//   const N = data.length;
//   const angleArr = Array.from({ length: N }, (_, i) => (i / (N - 1)) * 4 * Math.PI);

//   // 2. Calcule raio, x, y para cada ponto
//   const points = angleArr.map((angle, i) => {
//     const radius = a + b * angle;
//     return {
//       x: radius * Math.cos(angle),
//       y: radius * Math.sin(angle),
//       value: data[i].ws100 ?? data[i].Value ?? 0,
//       label: data[i].id ?? data[i].Time ?? "",
//     };
//   });

//   // 3. Gere a linha da espiral (mais suave)
//   const spiralSteps = 500;
//   const spiralAngles = Array.from({ length: spiralSteps }, (_, i) => (i / (spiralSteps - 1)) * 4 * Math.PI);
//   const spiralLine = spiralAngles.map(angle => {
//     const radius = a + b * angle;
//     return [radius * Math.cos(angle), radius * Math.sin(angle)];
//   });

//   // 4. Configuração do Highcharts (scatter + line)
//   const options = {
//     chart: {
//       type: 'scatter',
//       backgroundColor: "#fff",
//       width: 800,
//       height: 600,
//     },
//     title: { text: "Spiral Chart" },
//     xAxis: {
//       title: { text: "X-axis" },
//       gridLineColor: "lightgray",
//       gridLineWidth: 1,
//       lineColor: "#ccc",
//       tickLength: 0,
//     },
//     yAxis: {
//       title: { text: "Y-axis" },
//       gridLineColor: "lightgray",
//       gridLineWidth: 1,
//       lineColor: "#ccc",
//       tickLength: 0,
//     },
//     plotOptions: {
//       scatter: {
//         marker: { symbol: 'circle', radius: 6 }
//       }
//     },
//     series: [
//       {
//         name: "Spiral",
//         type: "line",
//         data: spiralLine,
//         color: "gray",
//         lineWidth: 1,
//         enableMouseTracking: false,
//         marker: { enabled: false },
//         showInLegend: true,
//       },
//       {
//         name: "Data Points",
//         type: "scatter",
//         data: points.map(p => ({
//           x: p.x,
//           y: p.y,
//           name: p.label,
//           value: p.value,
//         })),
//         color: "#007bff",
//         marker: { radius: 8 },
//         dataLabels: {
//           enabled: true,
//           format: "{point.value:.2f}",
//           style: { color: "#333", fontWeight: "bold" },
//         },
//         tooltip: {
//           pointFormat: "Valor: <b>{point.value:.2f}</b><br/>Label: {point.name}"
//         }
//       }
//     ],
//     legend: { enabled: true },
//     credits: { enabled: false },
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// }

// export default SpiralChart;

// // faz a espiral0
// import React from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import HighchartsMore from "highcharts/highcharts-more";

// if (typeof HighchartsMore === "function") {
//   HighchartsMore(Highcharts);
// }

// function SpiralChart({ data }) {
//   const a = 1;      // Constante da espiral
//   const b = 0.25;   // Espaçamento entre voltas (ajuste para separar bem)

//   if (!data || data.length === 0) return null;

//   // 1. Calcule o ângulo e raio de cada ponto de forma contínua
//   const N = data.length;
//   const maxTurns = 6; // Quantas voltas a espiral deve dar (ajuste conforme seu dataset)
//   const angleArr = Array.from({ length: N }, (_, i) => (i / N) * maxTurns * 2 * Math.PI);

//   const points = angleArr.map((angle, i) => {
//     const radius = a + b * angle;
//     return {
//       x: radius * Math.cos(angle),
//       y: radius * Math.sin(angle),
//       value: data[i].ws100 ?? data[i].Value ?? 0,
//       label: data[i].id ?? data[i].Time ?? "",
//     };
//   });

//   // Linha da espiral para visualização
//   const spiralSteps = 500;
//   const spiralAngles = Array.from({ length: spiralSteps }, (_, i) => (i / (spiralSteps - 1)) * maxTurns * 2 * Math.PI);
//   const spiralLine = spiralAngles.map(angle => {
//     const radius = a + b * angle;
//     return [radius * Math.cos(angle), radius * Math.sin(angle)];
//   });

//   const options = {
//     chart: {
//       type: 'scatter',
//       backgroundColor: "#fff",
//       width: 800,
//       height: 600,
//     },
//     title: { text: "Spiral Chart (espiral contínua)" },
//     xAxis: { title: { text: "X-axis" }, gridLineColor: "lightgray", gridLineWidth: 1 },
//     yAxis: { title: { text: "Y-axis" }, gridLineColor: "lightgray", gridLineWidth: 1 },
//     plotOptions: {
//       scatter: { marker: { symbol: 'circle', radius: 6 } }
//     },
//     series: [
//       {
//         name: "Spiral",
//         type: "line",
//         data: spiralLine,
//         color: "gray",
//         lineWidth: 1,
//         enableMouseTracking: false,
//         marker: { enabled: false },
//         showInLegend: true,
//       },
//       {
//         name: "Data Points",
//         type: "scatter",
//         data: points.map(p => ({
//           x: p.x,
//           y: p.y,
//           name: p.label,
//           value: p.value,
//         })),
//         color: "#007bff",
//         marker: { radius: 8 },
//         dataLabels: {
//           enabled: true,
//           format: "{point.value:.2f}",
//           style: { color: "#333", fontWeight: "bold" },
//         },
//         tooltip: {
//           pointFormat: "Valor: <b>{point.value:.2f}</b><br/>Data: {point.name}"
//         }
//       }
//     ],
//     legend: { enabled: true },
//     credits: { enabled: false },
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// }

// export default SpiralChart;

// ta good
// import React from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import HighchartsMore from "highcharts/highcharts-more";

// if (typeof HighchartsMore === "function") {
//   HighchartsMore(Highcharts);
// }

// function SpiralChart({ data }) {
//   const a = 1;
//   const b = 0.25;

//   if (!data || data.length === 0) return null;

//   const N = data.length;
//   const maxTurns = 6;
//   const angleArr = Array.from({ length: N }, (_, i) => (i / N) * maxTurns * 2 * Math.PI);

//   const points = angleArr.map((angle, i) => {
//     const radius = a + b * angle;
//     const value = data[i].ws100 ?? data[i].Value ?? 0;
//     return {
//       x: radius * Math.cos(angle),
//       y: radius * Math.sin(angle),
//       colorValue: value,
//       name: data[i].id ?? data[i].Time ?? "",
//       value,
//     };
//   });

//   // Para o heatmap: limites de cor
//   const minValue = Math.min(...points.map(p => p.colorValue));
//   const maxValue = Math.max(...points.map(p => p.colorValue));

//   // Linha da espiral para visualização
//   const spiralSteps = 500;
//   const spiralAngles = Array.from({ length: spiralSteps }, (_, i) => (i / (spiralSteps - 1)) * maxTurns * 2 * Math.PI);
//   const spiralLine = spiralAngles.map(angle => {
//     const radius = a + b * angle;
//     return [radius * Math.cos(angle), radius * Math.sin(angle)];
//   });

//   const options = {
//     chart: {
//       type: 'scatter',
//       backgroundColor: "#fff",
//       width: 800,
//       height: 600,
//     },
//     title: { text: "Spiral Chart (espiral contínua, heatmap de velocidade)" },
//     xAxis: { title: { text: "X-axis" }, gridLineColor: "lightgray", gridLineWidth: 1 },
//     yAxis: { title: { text: "Y-axis" }, gridLineColor: "lightgray", gridLineWidth: 1 },
//     colorAxis: {
//       min: minValue,
//       max: maxValue,
//       stops: [
//         [0, "#3060cf"],    // Azul para velocidades baixas
//         [4/15, "#fffbbc"],  // Amarelo para médias
//         [1, "#c4463a"],    // Vermelho para altas
//       ],
//     },
//     plotOptions: {
//       scatter: {
//         marker: {
//           symbol: 'square',
//           radius: 6,
//         }
//       }
//     },
//     series: [
//       {
//         name: "Spiral",
//         type: "line",
//         data: spiralLine,
//         color: "gray",
//         lineWidth: 1,
//         enableMouseTracking: false,
//         marker: { enabled: false },
//         showInLegend: true,
//       },
//       {
//         name: "Data Points",
//         type: "scatter",
//         data: points,
//         colorKey: "colorValue", // <- ESSENCIAL para heatmap
//         marker: { radius: 8 },
//         dataLabels: {
//           enabled: true,
//           format: "{point.value:.2f}",
//           style: { color: "#333", fontWeight: "bold" },
//         },
//         tooltip: {
//           pointFormat: "Velocidade: <b>{point.value:.2f} m/s</b><br/>Data: {point.name}"
//         }
//       }
//     ],
//     legend: { enabled: true },
//     credits: { enabled: false },
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// }

// export default SpiralChart;

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";

if (typeof HighchartsMore === "function") {
  HighchartsMore(Highcharts);
}

function SpiralChart({ data }) {
  const a = 1;      // Raio inicial
  const b = 1.5;    // Espaçamento entre voltas (ajuste para separar bem os meses)

  if (!data || data.length === 0) return null;

  // 1. Agrupar dados por mês
  const months = {};
  data.forEach((row) => {
    const date = new Date(row.id ?? row.Time);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!months[monthKey]) months[monthKey] = [];
    months[monthKey].push({ ...row, date });
  });

  // 2. Espiral contínua: cada ponto avança no ângulo e no raio, mas a cada 2π (360°) é um novo mês
  let points = [];
  let monthIndex = 0;
  let globalIdx = 0;
  Object.values(months).forEach((monthData) => {
    const N = monthData.length;
    monthData.forEach((row, i) => {
      // Cada mês ocupa uma volta completa (0 a 2π)
      const angle = (i / N) * 2 * Math.PI + monthIndex * 2 * Math.PI;
      const radius = a + b * monthIndex + (b * i) / N; // Raio cresce suavemente dentro do mês
      const value = row.ws100 ?? row.Value ?? 0;
      points.push({
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        colorValue: value,
        name: row.id ?? row.Time ?? "",
        value,
        month: monthIndex + 1,
      });
      globalIdx++;
    });
    monthIndex++;
  });

  // Linha da espiral para visualização
  const spiralSteps = 500;
  const spiralAngles = Array.from({ length: spiralSteps }, (_, i) => (i / (spiralSteps - 1)) * monthIndex * 2 * Math.PI);
  const spiralLine = spiralAngles.map(angle => {
    const radius = a + b * (angle / (2 * Math.PI));
    return [radius * Math.cos(angle), radius * Math.sin(angle)];
  });

  // Limites para o heatmap
  const minValue = Math.min(...points.map(p => p.colorValue));
  const maxValue = Math.max(...points.map(p => p.colorValue));

  const options = {
    chart: {
      type: 'scatter',
      backgroundColor: "#fff",
      width: 800,
      height: 600,
    },
    title: { text: "Espiral Contínua (1 volta = 1 mês)" },
    xAxis: { title: { text: "X-axis" }, gridLineColor: "lightgray", gridLineWidth: 1 },
    yAxis: { title: { text: "Y-axis" }, gridLineColor: "lightgray", gridLineWidth: 1 },
    colorAxis: {
      min: 0,
      max: 15,
      stops: [
        [0, "#3060cf"], // Azul para velocidades mais baixas
        [0.25, "#80aaff"], // Azul claro para velocidades baixas-médias
        [0.5, "#fffbbc"], // Amarelo para velocidades médias
        [0.75, "#ff7f50"], // Laranja para velocidades altas
        [1, "#c4463a"],
      ],
    },
    plotOptions: {
      scatter: {
        marker: {
          symbol: 'square',
          radius: 6,
        }
      }
    },
    series: [
      {
        name: "Spiral",
        type: "line",
        data: spiralLine,
        color: "gray",
        lineWidth: 1,
        enableMouseTracking: false,
        marker: { enabled: false },
        showInLegend: true,
        visible: false
      },
      {
        name: "Data Points",
        type: "scatter",
        data: points,
        colorKey: "colorValue",
        marker: { radius: 20 },
        dataLabels: {
          enabled: true,
          format: "{point.value:.2f}",
          style: { color: "#333", fontWeight: "bold" },
        },
        tooltip: {
          pointFormat: "Velocidade: <b>{point.value:.2f} m/s</b><br/>Data: {point.name}<br/>Mês: {point.month}"
        }
      }
    ],
    legend: { enabled: true },
    credits: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default SpiralChart;
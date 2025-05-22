
import React, { useState, useEffect } from "react";
import { useCSVReader } from "react-papaparse";

import SerieSpeed from "./SerieSpeed";
import SerieDirection from "./SerieDirection";
import WindRose from './WindRose';
import HeatMap from './HeatMap';
import ChartHistogram from "./ChartHistogram";
import SpiralChart from "./SpiralChart"
import SerieSuavizada from "./SerieSuavizada";
import StickPlot from "./StickPlot";

import { Link } from "react-router-dom"; // Importe o Link do React Router


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Slider } from "@mui/material"; // Slider para o filtro de velocidade
import '../App.css';
import '../Styles/dashboard.css';
import '../Styles/table.css';
import '../Styles/charts.css';
import axios from 'axios';

const styles = {
  csvReader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10
  },
  browseFile: {
    width: "20%"
  },
  acceptedFile: {
    border: "1px solid #ccc",
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: "80%"
  },
  remove: {
    borderRadius: 0,
    padding: "0 20px"
  },
  progressBarBackgroundColor: {
    backgroundColor: "red"
  }
};

export default function CSVReader() {
  const { CSVReader } = useCSVReader();
  const [csvData, setCsvData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [speedRange, setSpeedRange] = useState([0, 20]); // Intervalo inicial de velocidade ajustado
  const [respostaApi, setRespostaApi] = useState(null); // Estado para armazenar a resposta da API
  useEffect(() => {
    console.log("CSV atualizado:", csvData);
  }, [csvData]);

  // const enviarParaApi = async (dados) => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/processar', dados);
  //     setResultado(response.data);
  //   } catch (error) {
  //     console.error('Erro ao enviar dados:', error);
  //   }
  // };
    const enviarParaApi = async (dados) => {
    try {
      const response = await axios.post('http://localhost:5000/processar', dados);
      console.log('Resposta da API:', response.data);
      setRespostaApi(response.data); // Armazena a resposta da API no estado
      console.log('Dados Recebidos da API:', respostaApi);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };


  // Converter dia, mês e ano para um objeto Date
  const parseDate = (day, month, year) => {
    if (!day || !month || !year) return null;
    const date = new Date(year, month - 1, day); // Quando usa 'Date' -> Janeiro = 0
    return date;
  };

  // Filtrar os dados com base na data e na velocidade
  const displayedData = csvData && (startDate || endDate || speedRange)
    ? csvData.filter(row => {
        // Filtro por data
        const rowDate = parseDate(Number(row["day"]), Number(row["month"]), Number(row["year"]));
        if (startDate && endDate && (!rowDate || rowDate < startDate || rowDate > endDate)) {
          return false;
        }
        if (startDate && (!rowDate || rowDate < startDate)) {
          return false;
        }
        if (endDate && (!rowDate || rowDate > endDate)) {
          return false;
        }

        // Filtro por velocidade
        const speed = parseFloat(row["ws100"]);
        if (speed < speedRange[0] || speed > speedRange[1]) {
          return false;
        }
        return true; // Inclui a linha se passar em todos os filtros
      })
      : csvData;
      
      useEffect(() => {
        console.log("Intervalo selecionado: ", startDate, " até ", endDate);
        console.log("Dados filtrados:", displayedData);
        console.log('Dados Recebidos da API:', respostaApi);
      }, [startDate, endDate, speedRange, displayedData]);

      // useEffect(() => {
      //   if (displayedData && displayedData.length > 0) {
      //     console.log("Enviando dados filtrados para o backend...");
      //     enviarParaApi(displayedData);
      //   }
      // }, [displayedData]);

  return (
    <>
      <CSVReader
        config={{ header: true }}
        onUploadAccepted={(results) => {
          console.log("Arquivo CSV carregado", results.data);
          setCsvData(results.data);
          enviarParaApi(results.data); // Enviar dados para a API
        }}
      >
        {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
          <>
            <div style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
              <button type="button" {...getRootProps()} style={{ width: "20%" }}>
                Browse file
              </button>
              <div id="csv" style={{ border: "1px solid #ccc", height: 45, lineHeight: 2.5, paddingLeft: 10, width: "80%" }}>
                {acceptedFile && acceptedFile.name ? acceptedFile.name : "No file loaded"}
              </div>
              <button {...getRemoveFileProps()} style={{ borderRadius: 0, padding: "0 20px" }} onClick={() => setCsvData(null)}>
                Remove
              </button>
            </div>
            <ProgressBar />
          </>
        )}
      </CSVReader>

      {/* Filtro de intervalo de Data */}
      {csvData && (
        <div>
          <label>Filtrar por Data: </label>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setStartDate(update[0]);
              setEndDate(update[1]);
            }}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecione um intervalo"
            isClearable
            minDate={new Date(2021, 0, 1)} // Definindo data mínima (1 de janeiro de 2021)
            maxDate={new Date(2024, 11, 31)} // Definindo data máxima (31 de dezembro de 2021)
            scrollableMonthYearDropdown
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            todayButton="Hoje"
            // Data inicial para o calendário (setando para 1 de setembro de 2021)
            //defaultValue={new Date(2021, 10, 10)}
            
          />

          {/* Filtro de Velocidade */}
          <div style={{ marginTop: "10px" }}>
            <label>Filtrar por Velocidade (m/s): </label>
            <Slider
              value={speedRange}
              onChange={(event, newValue) => setSpeedRange(newValue)}
              valueLabelDisplay="auto"
              min={0} // Valor mínimo do slider
              max={20} // Valor máximo do slider
              step={0.1} // Incremento do slider para maior precisão
              style={{ width: "300px", marginLeft: "10px" }}
            />
          </div>
        </div>
      )}

      <div className="general">
        {displayedData && displayedData.length > 0 ? (
          <div className="general-container">
            <div className="chart-container">
              <div className="chart-line">
                <StickPlot />
              </div>
              {/* <div className="chart-line">
                <SerieSuavizada data={respostaApi} />
              </div>
              <div className="chart-line">
                <SerieDirection data={displayedData} />
              </div>
              <div className="chart-top">
                <div className="chart-column">
                  <HeatMap data={displayedData} />
                </div>
                <div className="new-chart">
                  <ChartHistogram data={displayedData} />
                </div>
              </div>
                            <div className="chart-top">
                <div className="wind-rose">
                  <WindRose data={displayedData} />
                </div>
                <div className="chart-column">
                  <SpiralChart data={displayedData} />
                </div>
              </div> */}
              <div >
                {/* <Link
                  to={{
                    pathname: "/analise",
                  }}
                  state={{ csvData }} // Passa os dados como estado
                  target="_blank" // Abre em uma nova aba
                  style={{ textDecoration: "none", color: "white" }} // Estilo do link
                  rel="noopener noreferrer" // Segurança ao abrir em nova aba
                >
                  <button>Analise</button>
                </Link> */}
                {/* <button
                  onClick={() => {
                    localStorage.setItem("csvData", JSON.stringify(csvData));
                    window.open("/analise", "_blank");
                  }}
                >
                  Analise
                </button> */}
                <div style={{ marginTop: "24px", textAlign: "center" }}>
                  <div style={{ marginBottom: "8px", fontSize: "1.08rem", color: "#0742e6", fontWeight: 500 }}>
                    Clique para abrir a análise detalhada dos dados em uma nova aba.
                  </div>
                  <button
                    className="btn-analise"
                    onClick={() => {
                      localStorage.setItem("csvData", JSON.stringify(csvData));
                      window.open("/analise", "_blank");
                    }}
                  >
                    Análise
                  </button>
                </div>
                {/* <a
                  href={`/analise?data=${encodeURIComponent(JSON.stringify(csvData))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <button>Analise</button>
                </a> */}
                {/* <a
                  href="/analise"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    localStorage.setItem("csvData", JSON.stringify(csvData));
                  }}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <button>Analise</button>
                </a> */}
              </div>
            </div>
          </div>
        ) : (
          <p>{(startDate || endDate || speedRange) ? "Nenhum dado encontrado para este filtro." : "Carregue um arquivo CSV "}</p>
        )}
      </div>
    </>
  );
}
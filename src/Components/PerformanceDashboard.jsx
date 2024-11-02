import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import NotificationCard from './NotificationCard';
import Graph from './Graph';
import CustomSelect from './Select';

export default function PerformanceDashboard ()  {
  const [classOptions2, setClassOptions2] = useState([]);
  const [selectedClass2, setSelectedClass2] = useState(""); // Alterado para string vazia
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_BASE_URL_ATHENA; 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${apiUrl}/classes/teacher`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.message && Array.isArray(data.message)) {
          const classes = data.message.map(cls => ({
            value: cls._id,
            label: cls.name,
          }));
          setClassOptions2(classes);
        } else {
          console.error("A resposta da API não contém um array em `message`:", data);
        }
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    };

    fetchClasses();
  }, []);


  const handleClassChange2 = (event) => {
    const selectedValue = event.target.value; 
  
    const selectedOption = classOptions2.find(option => option.value === selectedValue);
    
    if (selectedOption) {
      setSelectedClass2(selectedValue);
      setLoading(true);
  
      fetchDataForSelectedClass(selectedValue);
    } else {
      setSelectedClass2(""); 
    }
  };
  
  const fetchDataForSelectedClass = async (classId) => {
    try {
      const response = await fetch(`${apiUrl}/stats/performance/${classId}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setGraphData(data || []);
    } catch (error) {
      console.error('Erro ao buscar dados do gráfico:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Grid
      item
      xs={12}
      sm={5}
      sx={{ backgroundColor: "white", borderRadius: 5, height: "800px" }}
    >
      <Typography
        sx={{
          textAlign: "center",
          borderBottom: "2px solid #004FFF",
          color: "black",
          fontWeight: "bold",
          width: "50%",
          margin: "0 auto",
          padding: "8px 0",
          fontSize: 25,
        }}
      >
        DESEMPENHO DE SUAS SALAS
      </Typography>
      <NotificationCard
        year={selectedClass2}
        userId="67102922db9e7ba8075983e9"
        userType="professor"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
        }}
      >
<CustomSelect
  label="Selecione uma sala"
  menuItems={classOptions2}
  value={selectedClass2} // Isso deve ser uma string que corresponde ao valor de uma das opções
  onChange={handleClassChange2}
/>

        <Graph
          type="pie"
          data={graphData.length > 0 ? graphData : [
            { name: "Nível 1", value: 10, color: "#405480" },
            { name: "Nível 2", value: 22, color: "#235BD5" },
            { name: "Nível 3", value: 27, color: "#394255" },
            { name: "Nível 4", value: 27, color: "#004FFF" },
          ]}
        />
      </Box>
    </Grid>
  );
};



import React, { useEffect, useState } from 'react';
import { Pie } from "react-chartjs-2";
import axios from "axios";

function PieChart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Selected Month Changed:", props.selectedMonth);
        const response = await axios.get(
          "http://localhost:3000/api/product/pieChartsInfo",
          {
            params: {
              month: props.selectedMonth,
            },
          }
        );
        const result = response.data;
        setData(result.pieChartData); // Access the correct property in the response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.selectedMonth]);

  // No need to sort data for a Pie chart

  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        label: 'Categories',
        data: data.map((item) => item.count),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ width: 700 }}>
      <Pie data={chartData} />
    </div>
  );
}

export default PieChart;
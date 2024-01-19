import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import './assets/BarChart.css'


function BarChart(props) {

    const [data, setData] = useState([]);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/product/barChartsInfo",
            {
              params: {
                month: props.selectedMonth, // Adjusted from search to month
              },
            }
          );
      
          const result = response.data.result;
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [props.selectedMonth]);
    data.sort((a, b) => {
      
        const rangeA = a._id.split('-').map(Number);
        const rangeB = b._id.split('-').map(Number);
      
        return rangeA[0] - rangeB[0];
      });
    const chartData = {
        labels: data.map((d) => d._id),
        datasets: [
          {
            label: 'Range',
            data: data.map((item) => item.count),
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
              ],
              borderColor: "black",
              borderWidth: 2,
          },
        ],
      };
      
//    data.forEach(element => {
//     console.log(element._id,"===>",element.count);
//    });

const renderHeading = () => {
  if (props.selectedMonth.length>0) {
    return `Sales During ${props.selectedMonth}`;
  } else {
    return 'Sales During Whole Year';
  }
};


   return (
    <>
    <div className="heading">
        <h2>{renderHeading()}</h2>
      </div>
    <div className="bar-chart" style={{ width: 700 }}>
      
   <Bar data={chartData} />
   </div>
   </>
   );
}

export default BarChart;
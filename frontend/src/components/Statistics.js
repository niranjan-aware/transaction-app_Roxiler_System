import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/Statistics.css'; 

const Statistics = (props) => {
  const [salesInfo, setSalesInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/product/calculateSalesInfo",
          {
            params: {
              month: props.selectedMonth,
            },
          }
        );
        setSalesInfo(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.selectedMonth]);

  console.log(props.selectedMonth.length);

  const renderHeading = () => {
    if (props.selectedMonth.length>0) {
      return `Sales During ${props.selectedMonth}`;
    } else {
      return 'Sales During Whole Year';
    }
  };

  return (
    <div>
      
      <div className="statistics-container">
      <div className="stats-heading">
        <h2>{renderHeading()}</h2>
      </div>
        {salesInfo ? (
          <table>
            <thead>
              <tr>
                <th>Total Sales</th>
                <th>Sold Count</th>
                <th>Unsold Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{salesInfo.totalSales}</td>
                <td>{salesInfo.soldCount}</td>
                <td>{salesInfo.unSoldCount}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Statistics;

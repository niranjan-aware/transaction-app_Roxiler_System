import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/Statistics.css'; // Create this CSS file for styling

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

  return (
    <div className="statistics-container">
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
  );
};

export default Statistics;

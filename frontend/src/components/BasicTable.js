import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import "./assets/BasicTable.css";

const BasicTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/product/productTransactions",
          {
            params: {
              page: 1,
              limit: 10,
              search: " ",
            },
          }
        );

        setTransactions(response.data.transactions);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => transactions, [transactions]);
  //   console.log("data=>>>", data);
  const tableInstance = useTable({
    columns,
    data,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  //const{rows}=tableInstance.data
  //   console.log(">>", rows, tableInstance);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                // console.log("cell==>>",cell);
                // console.log("cell==>>",cell.render('Cell'));

                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((footerGroup, index) => (
          <tr key={index} {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <td
                key={column.getFooterProps().key}
                {...column.getFooterProps()}
              >
                {column.render("Footer")}
              </td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default BasicTable;

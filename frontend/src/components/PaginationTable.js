import React, { useEffect, useState, useMemo, Fragment } from "react";
import axios from "axios";
import { useTable, usePagination } from "react-table";
import { COLUMNS } from "./columns";
import "./assets/PaginationTable.css";

const PaginationTable = (props) => {
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
              search: props.searchQuery,
              month: props.selectedMonth,
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
  }, [props.selectedMonth, props.searchQuery]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => transactions, [transactions]);
  // console.log("data=>>>", data);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderHeading = () => {
    if (props.selectedMonth.length>0) {
      return `Sales During ${props.selectedMonth}`;
    } else {
      return 'Sales During Whole Year';
    }
  };
  //const{rows}=tableInstance.data
  //   console.log(">>", rows, tableInstance);

  return (
    <Fragment>
      <div className="title-main">
        <h2>Transaction Table</h2>
      </div>
      <div className="heading">
        <h2>{renderHeading()}</h2>
      </div>
      <div className="table-parent">
      
        <table className="pagination-table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    // console.log("cell==>>",cell);
                    // console.log("cell==>>",cell.render('Cell'));

                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
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
      </div>
      <div className="pagination-controls">
        <span>
          Page{""}
          <strong>
            {pageIndex + 1}
            of {pageOptions.length}{" "}
          </strong>
        </span>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>

        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>

        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </Fragment>
  );
};

export default PaginationTable;

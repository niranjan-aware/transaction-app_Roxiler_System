import React, { Fragment, useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import PaginationTable from "./components/PaginationTable";
import Statistics from "./components/Statistics";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    if (location.pathname === "/") {
      setSearchQuery(e.target.value);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedMonth("");

    if (location.pathname === "/") {
      navigate("/", { replace: true });
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur(); 
    }
  };

  return (
    <Fragment>
      <div className="navbar">
        <div className="search-dropdown-container">
          {location.pathname === "/" && (
            <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleInputKeyDown}
            className="search-input"
          />
          )}
          <label htmlFor="monthDropdown" className="select-month-label">
            Select Month:&nbsp;
            <select
              id="monthDropdown"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="">All</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <button onClick={handleClearFilters}>Clear Filters</button>
          </label>
        </div>

        <nav>

          <Link to="/" className="nav-link">
            <button className="nav-btn">Transactions</button>
          </Link>
          <Link to="/barchart" className="nav-link">
          <button className="nav-btn">Sales</button>
          </Link>
          <Link to="/piechart" className="nav-link">
          <button className="nav-btn">PieChart</button>
          </Link>
          <Link to="/statistics" className="nav-link">
          <button className="nav-btn">SalesStats</button>
          </Link>
        </nav>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <PaginationTable
              searchQuery={searchQuery}
              selectedMonth={selectedMonth}
            />
          }
        />
        <Route
          path="/barchart"
          element={<BarChart selectedMonth={selectedMonth} />}
        />
        <Route
          path="/piechart"
          element={<PieChart selectedMonth={selectedMonth} />}
        />
        <Route
          path="/statistics"
          element={<Statistics selectedMonth={selectedMonth} />}
        />
      </Routes>
    </Fragment>
  );
}

export default App;

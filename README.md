# transaction-app_Roxiler_System
# MERN Transaction Table Web App

## Overview

This MERN (MongoDB, Express.js, React.js, Node.js) Transaction Table Web App provides a comprehensive view of transactions, sales statistics, and insightful visualizations such as bar and pie charts. It is built as part of a coding challenge that involves interacting with a third-party API to fetch product transactions data, initialize the database, and implement various APIs to cater to different functionalities.

## Backend

### Data Source

**Third-Party API URL:** [Product Transactions API](https://s3.amazonaws.com/roxiler.com/product_transaction.json)  
**Request Method:** GET  
**Response Format:** JSON

### API Endpoints

1. **Initialize Database API**
   - **Method:** GET
   - **Description:** Fetches JSON data from the third-party API and initializes the database with seed data.

2. **List All Transactions API**
   - **Method:** GET
   - **Description:** Lists all transactions with support for search and pagination based on product title, description, price, and the selected month.

3. **Statistics API**
   - **Method:** GET
   - **Description:** Provides total sale amount, total number of sold items, and total number of unsold items for the selected month.

4. **Bar Chart API**
   - **Method:** GET
   - **Description:** Returns the number of items in different price ranges for the selected month.

5. **Pie Chart API**
   - **Method:** GET
   - **Description:** Finds unique categories and the number of items from each category for the selected month.

6. **Combined Data API**
   - **Method:** GET
   - **Description:** Combines the responses from the above APIs and sends a final JSON response.

## Frontend

### Transactions Table

- Lists transactions based on the selected month with pagination.
- Provides a dropdown to select the month.
- Supports a search box for filtering transactions based on title, description, or price.
- Next and Previous buttons facilitate navigation through paginated data.

### Transactions Statistics

- Displays total sale amount, total sold items, and total unsold items for the selected month.
- Uses a dropdown to choose the month.

### Transactions Bar Chart

- Visualizes the number of items in different price ranges for the selected month.

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the backend server using `npm run server`.
4. Start the frontend using `npm start`.

Feel free to explore, analyze, and contribute to enhance this MERN Transaction Table Web App!

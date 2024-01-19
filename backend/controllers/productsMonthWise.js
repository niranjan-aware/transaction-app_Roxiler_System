const mongoose = require('mongoose');
const product = require('../models/product');

const productsMonthWise = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      let allProducts = await product.find();
      res.status(200).json({ success: true, allProducts });
    } else {
      let productsMonthWise = await product.find({ month });
      res.status(200).json({ success: true, productsMonthWise });
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = productsMonthWise;

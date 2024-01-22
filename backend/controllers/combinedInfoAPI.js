const Product = require('../models/product');


const combinedInfoAPI= async (req, res) => {
    try {

      const { month } = req.query;

      const matchStage = month ? month : "";
      const result = await Product.find({})
      if (month){
        const result = await Product.find({month})
      }
  
      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error('Error fetching combined data:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };


  module.exports=combinedInfoAPI
  
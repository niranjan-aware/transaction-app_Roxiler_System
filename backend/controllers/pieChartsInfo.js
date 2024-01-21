const Product = require('../models/product');

const pieChartsInfo = async (req, res) => {
  try {
    const { month } = req.query;

    let matchStage = {};

    if (month) {
      matchStage = {
        month:{ $regex: month, $options: "i" },
      };
    }

    const result = await Product.aggregate([
      {
        $match: matchStage,
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    
    const categories = ["men's clothing", 'jewelery', 'electronics', "women's clothing"];
    const pieChartData = categories.map((category) => ({
      category,
      count: (result.find((item) => item._id === category) || { count: 0 }).count,
    }));

    res.status(200).json({ success: true, pieChartData });
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = pieChartsInfo;

const calculateBarChartData=require('./barChartsInfo')
const calculatePieChartData=require('./pieChartsInfo')
const calculateSalesInfo=require('./calculateSalesInfo')


const combinedInfoAPI= async (req, res) => {
    try {
      const { month } = req.query;
  
      const totalSalesInfo = await calculateSalesInfo(month);
      const barChartData = await calculateBarChartData(month);
      const pieChartData = await calculatePieChartData(month);
  
      const combinedResponse = {
        totalSalesInfo,
        barChartData,
        pieChartData,
      };
  
      res.status(200).json({ success: true, combinedResponse });
    } catch (error) {
      console.error('Error fetching combined data:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };


  module.exports=combinedInfoAPI
  
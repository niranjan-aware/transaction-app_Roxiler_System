const storeProductData=require('./storeProductData')
const transactions=require('./transactions')
const productsMonthWise=require('./productsMonthWise')
const calculateSalesInfo=require('./calculateSalesInfo')
const barChartsInfo=require('./barChartsInfo')
const pieChartsInfo=require('./pieChartsInfo')
const combinedInfoAPI=require('./combinedInfoAPI')

module.exports={
    storeProductData,
    transactions,
    productsMonthWise,
    calculateSalesInfo,
    barChartsInfo,
    pieChartsInfo,
    combinedInfoAPI
}
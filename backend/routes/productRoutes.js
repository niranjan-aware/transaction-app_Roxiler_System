const express=require('express');
const router=express.Router();
const controllers=require('../controllers/productControllers')

router.get('/productDetails',controllers.storeProductData);
router.get('/productTransactions',controllers.transactions);
router.get('/productsMonthWise',controllers.productsMonthWise);
router.get('/calculateSalesInfo',controllers.calculateSalesInfo);
router.get('/barChartsInfo',controllers.barChartsInfo);
router.get('/pieChartsInfo',controllers.pieChartsInfo);
router.get('/combinedInfoAPI',controllers.combinedInfoAPI);

module.exports=router
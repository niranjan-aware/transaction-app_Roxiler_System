const mongoose=require('mongoose')
const moment=require('moment')
const Product=require('../models/product')
const axios=require('axios')

const storeProductData= async(req,res)=>{
    try{
        const response=await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data=response.data;
        console.log('Data fethched sucessfully from amazon')
          
        data.forEach(product => {
        const month = moment(product.dateOfSale).format('MMMM');
        product.month = month;
        });

        if(data){
            try {
                await Product.insertMany(data);
                res.status(201).send('Product Data Save Succefully !')
            } catch (error) {
                console.log('Error in saving of Product List',error)
            }
        }
        else{
            console.log('Data is Not present');
        }

    }catch(error){
        res.status(500).send('Unable to storeProductData: ' + error);

    }
}

module.exports=storeProductData;
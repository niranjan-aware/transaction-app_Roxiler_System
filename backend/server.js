const express=require('express')
const cors=require('cors')
const router=require('./routes/productRoutes')
const productRouter=require('./routes/productRoutes')

const app=express();
app.use(express.json())
app.use(cors())

require('./db/mongoose')

const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})

const PORT=process.env.PORT || process.env.API_PORT

app.use('/api/product',productRouter)

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`);
})

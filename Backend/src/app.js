const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();


app.use(express.json());
const aiRoutes = require('./routes/ai.routes');

app.use('/ai', aiRoutes);

app.post('/',(req,res)=>{
    res.send('Hello World!');
})

module.exports = app;
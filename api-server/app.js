require('dotenv').config()
const express = require('express')

const read_sqs_cronjob = require('./controller/cronjobs/read_sqs_cronjob');
const start_container = require('./controller/start_container');
const read_hls_sqs_cronjob = require('./controller/cronjobs/read_hls_sqs_cronjob');

const app = express();
const PORT = process.env.PORT || 9000
app.use(express.json());

read_sqs_cronjob();
read_hls_sqs_cronjob();

const config = {
    }

app.get('/', async (req, res) => {
    return res.status(200).json({
        message: "Hello from hls api server."
    })
})

app.post('/start-container', async (req, res) => {
    console.log("REQUEST RECEIVED...")
    const response = await start_container()
})

app.listen(PORT, (err) => {
    if(!err){
        console.log(`API Server is Running on PORT :: ${PORT}`)
    }
    else{
        console.log(`Error in starting API Server on PORT :: ${PORT} ERROR :: ${err.message}`)
    }
})
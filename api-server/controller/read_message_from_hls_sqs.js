const { SQSClient, ReceiveMessageCommand } = require("@aws-sdk/client-sqs");
const start_container = require("./start_container");
const delete_message_from_sqs = require("./delete_message_from_sqs");

const config = {
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_SQS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SQS_SECRET_ACCESS_KEY
    }
}

const client = new SQSClient(config);


const read_message_from_hls_sqs = async () => {

    const input = { // ReceiveMessageRequest
        QueueUrl: process.env.AWS_HLS_SQS_URL,// required
        MaxNumberOfMessages: 1,
        // VisibilityTimeout: 20, // Same as defined while creating SQS, can be varied as well
        WaitTimeSeconds:10, //long polling wait time, to reduce eliminating the number of empty responses and false empty responses
        // ReceiveRequestAttemptId: "unique id for every request, useful when retrying due to network failure",
    };

    const command = new ReceiveMessageCommand(input);
    const response = await client.send(command);
    
    if(!response?.Messages){
        console.log("Queue is empty!");
        return;
    }

    let data = response?.Messages[0]?.Body;
    // data = JSON.parse(data);
    console.log("READ MESSAGE FROM HLS SQS :: ", data)

    const receiptHandle = data
    const hls_receiptHandle =  response?.Messages[0]?.ReceiptHandle;

    const delete_sqs_message_1 = await delete_message_from_sqs(process.env.AWS_SQS_URL, receiptHandle);

    if(delete_sqs_message_1){
        await delete_message_from_sqs(process.env.AWS_HLS_SQS_URL, hls_receiptHandle);
    }


    

    // console.log("SQS RESPONSE :: ", filtered_data);
}

module.exports = read_message_from_hls_sqs;
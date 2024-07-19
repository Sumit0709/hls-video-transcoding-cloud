const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const config = {
    region: process.env.AWS_HLS_SQS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_SQS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SQS_SECRET_ACCESS_KEY
    }
}

const client = new SQSClient(config);

const write_into_sqs = async () => {

    try{
        const receiptHandle = process.env.AWS_SQS_MESSAGE_RECEIPTHANDLE

        const input = { // ReceiveMessageRequest
            QueueUrl: process.env.AWS_HLS_SQS_URL,// required
            MessageBody: receiptHandle,
        };

        const command = new SendMessageCommand(input);
        const response = await client.send(command);
        
        if(response?.MessageId){
            console.log("Message written into queue successfully.");
            return;
        }
    }
    catch(err){
        console.log("ERROR :: ");
        console.log(err.message);
    }
    
}


module.exports = write_into_sqs;
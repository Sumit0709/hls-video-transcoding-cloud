const { SQSClient, DeleteMessageCommand  } = require("@aws-sdk/client-sqs");
const start_container = require("./start_container");

const config = {
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_SQS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SQS_SECRET_ACCESS_KEY
    }
}

const client = new SQSClient(config);



const delete_message_from_sqs = async (receiptHandle) => {

    const input = { // ReceiveMessageRequest
        QueueUrl: process.env.AWS_SQS_URL,// required
        ReceiptHandle: receiptHandle        
    };

    const command = new DeleteMessageCommand(input);
    const response = await client.send(command);

    console.log("DELETE MESSAGE FROM SQS RESPONSE :: ", response);
}

module.exports = delete_message_from_sqs;
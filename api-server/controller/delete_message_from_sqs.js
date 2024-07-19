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



const delete_message_from_sqs = async (aws_sqs_url, receiptHandle) => {

    try{
        const input = { // ReceiveMessageRequest
            QueueUrl: aws_sqs_url,// required
            ReceiptHandle: receiptHandle        
        };
    
        const command = new DeleteMessageCommand(input);
        const response = await client.send(command);
    
        console.log("DELETE MESSAGE FROM SQS, RESPONSE :: ", response);
        return true;
    }
    catch(err){
        console.log("Error while deleting SQS Message :: ")
        console.log("sqs url :: ", aws_sqs_url)
        console.log("error :: ", err.message)

        return false;
    }
}

module.exports = delete_message_from_sqs;
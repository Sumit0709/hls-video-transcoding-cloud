const { SQSClient, ReceiveMessageCommand } = require("@aws-sdk/client-sqs");

const config = {
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_SQS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SQS_SECRET_ACCESS_KEY
    }
}

const client = new SQSClient(config);

const read_data_from_sqs = async () => {

    const input = { // ReceiveMessageRequest
        QueueUrl: process.env.AWS_SQS_URL,// required
        MaxNumberOfMessages: 1,
        VisibilityTimeout: 20, // Same as defined while creating SQS, can be varied as well
        WaitTimeSeconds:10, //long polling wait time, to reduce eliminating the number of empty responses and false empty responses
        // ReceiveRequestAttemptId: "unique id for every request, useful when retrying due to network failure",
    };

    const command = new ReceiveMessageCommand(input);
    const response = await client.send(command);

    let data = response?.Messages[0]?.Body;
    data = JSON.parse(data);

    console.log("SQS RESPONSE :: ", data);

}

module.exports = read_data_from_sqs;
const { SQSClient, ReceiveMessageCommand } = require("@aws-sdk/client-sqs");
const start_container = require("./start_container");

const config = {
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_SQS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SQS_SECRET_ACCESS_KEY
    }
}

const client = new SQSClient(config);

const isValidData = (filtered_data) => {
    if(filtered_data == null)
        return false;

    const region =filtered_data.region
    const source_bucket = filtered_data.source_bucket
    const key =filtered_data.key
    const size = filtered_data.size


    if(region == null || region == "") {return false;}
    if(source_bucket==null || source_bucket=="") {return false}
    if(key == null || key == "") {return false;}
    if(size == null || size <= 0) {return false;}

    return true;
}

const read_message_from_sqs = async () => {

    const input = { // ReceiveMessageRequest
        QueueUrl: process.env.AWS_SQS_URL,// required
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
    data = JSON.parse(data);

    
    const filtered_data = {
        region: data.awsRegion,
        source_bucket: data.s3.bucket.name,
        key: data.s3.object.key,
        size: data.s3.object.size
    }

    const receiptHandle =  response?.Messages[0]?.ReceiptHandle;
    
    if(isValidData(filtered_data)){
        // start-container
        start_container(filtered_data, receiptHandle);
    }else{
        console.log("filtered_data is invalid");
    }

    // console.log("SQS RESPONSE :: ", filtered_data);
}

module.exports = read_message_from_sqs;
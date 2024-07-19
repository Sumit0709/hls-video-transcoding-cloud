const {ECSClient, RunTaskCommand} = require('@aws-sdk/client-ecs')

const ecsClient = new ECSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

const start_container = async (data, receiptHandle) => {
    try{
        
        const region = data.region
        const source_bucket = data.source_bucket

        const key = data.key
        const size = data.size

        const file_name = key.split("/").pop();
        const video_id = file_name.split(".")[0];

        console.log(file_name, video_id)

        const command = new RunTaskCommand({
            cluster: process.env.CLUSTER,
            taskDefinition: process.env.TASK,
            launchType: "FARGATE",
            count: 1,
            networkConfiguration:{
                awsvpcConfiguration:{
                    assignPublicIp: "ENABLED",
                    subnets: ["subnet-00f64bf49ea031948", "subnet-04b1c972e08a73fe6", "subnet-021fb96dba4d35dd2"],
                    securityGroups: ["sg-0010eb1dbba257f5a"]
                }
            },
            overrides: {
                containerOverrides: [
                    {
                        name: "hls-transcoder-image-in-task",
                        environment: [
                            { name: "AWS_REGION" , value: region},
                            { name: "VIDEO_ID" , value: video_id},
                            { name: "VIDEO_FILE_NAME" , value: file_name}, 
                            { name: "AWS_ACCESS_KEY_DOWNLOAD" , value: process.env.AWS_ACCESS_KEY_DOWNLOAD},
                            { name: "AWS_SECRET_ACCESS_KEY_DOWNLOAD" , value: process.env.AWS_SECRET_ACCESS_KEY_DOWNLOAD},
                            { name: "AWS_BUCKET_DOWNLOAD" , value: process.env.AWS_BUCKET_DOWNLOAD},
                            { name: "AWS_ACCESS_KEY_UPLOAD" , value: process.env.AWS_ACCESS_KEY_UPLOAD},
                            { name: "AWS_SECRET_ACCESS_KEY_UPLOAD" , value: process.env.AWS_SECRET_ACCESS_KEY_UPLOAD},
                            { name: "AWS_BUCKET_UPLOAD" , value: process.env.AWS_BUCKET_UPLOAD},
                            
                            { name: "AWS_HLS_SQS_REGION", value: process.env.AWS_HLS_SQS_REGION},
                            { name: "AWS_SQS_ACCESS_KEY", value: process.env.AWS_SQS_ACCESS_KEY},
                            { name: "AWS_SQS_SECRET_ACCESS_KEY", value: process.env.AWS_SQS_SECRET_ACCESS_KEY},
                            { name: "AWS_SQS_MESSAGE_RECEIPTHANDLE", value: receiptHandle},
                            { name: "AWS_HLS_SQS_URL", value: process.env.AWS_HLS_SQS_URL}
                        ]
                    }
                ]
            }
        })

        console.log("CREATING CONTAINER...")
        const response = await ecsClient.send(command);
        console.log("...COMPLETED CREATING CONTAINER")
        return {
            success: true,
            message: "Container creation request sent"
        }
        // return res.status(200).json({
        //     success: true,
        //     status: JSON.stringify(response)
        // })
    }
    catch(err){
        console.log(err);
        return {
            success: false,
            error: err.message,
            message: "Container creation request failed"
        }
        // return res.status(500).json({
        //     success: false,
        //     error: err.message
        // })
    }
}

module.exports = start_container;
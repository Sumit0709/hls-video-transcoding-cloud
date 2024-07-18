// require('dotenv').config()
const fs = require("fs")
const path = require('path')
const { exec } = require('child_process');
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_DOWNLOAD,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_DOWNLOAD
    }
})

const getObject_Video = async (bucket, fileName) => {
    const command = new GetObjectCommand({ 
        Bucket: bucket , 
        Key: `uploads/user-uploads/video/${fileName}`
    });

    return command
    // const url = await getSignedUrl(s3Client, command, { expiresIn: 60})
    const url = await getSignedUrl(s3Client, command)
    return url;
}


const init = async () => {
    console.log("DOWNLOAD STARTED")
    try{

        
        const bucket = process.env.AWS_BUCKET_DOWNLOAD
        const fileName = process.env.VIDEO_FILE_NAME;
        // const contentType = process.env.VIDEO_CONTENT_TYPE;
        
        const downloadPath = path.join(__dirname, "videos");
        const downloadPath_File = path.join(__dirname, "videos", fileName);
        // const deleteDownloadPath = path.join(__dirname, "videos");
        
        const create_directory = exec(`mkdir ${downloadPath}`);

    
        const getObjectCommand = await getObject_Video(bucket, fileName)

        const response = await s3Client.send(getObjectCommand);
        
        const downloadStream = response.Body;
        // Create a writable stream for the download path
        const writeStream = fs.createWriteStream(downloadPath_File);

        // Pipe the download stream to the writable stream for file creation
        downloadStream.pipe(writeStream);
        downloadStream.on("end", async () => {
            console.log("Video downloaded successfully! Start transcoding...")
            // process.exit(0);
        });
    }
    catch(err){
        console.log("Error in transcoding :: ",err)
    }
    finally{
        // console.log("DOWNLOAD FINISHED")
    }
    
}


init();
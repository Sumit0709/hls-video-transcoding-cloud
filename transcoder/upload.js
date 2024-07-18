// require('dotenv').config()
const fs = require("fs")
const path = require('path')
const { exec } = require('child_process');
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const mime = require('mime-types')
const async = require('async');

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_UPLOAD,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_UPLOAD
    }
})




const init = async () => {
    console.log("UPLOAD STARTED")
    try {


        const bucket = process.env.AWS_BUCKET_UPLOAD
        const fileName = process.env.VIDEO_FILE_NAME;
        const videoId = process.env.VIDEO_ID;

        const transcodedVideoPath = path.join(__dirname, 'videos', 'outputs', `video_${videoId}`)
        const transcodedVideoFolderContents = fs.readdirSync(transcodedVideoPath, { recursive: true })

        const prefix = "/home/app/videos/outputs/";

        const uploadFile = async (file) => {
            const filePath = path.join(transcodedVideoPath, file);
            if (fs.lstatSync(filePath).isDirectory()) return;

            const prefixIndex = filePath.indexOf(prefix);
            let aws_file_location = "uploads/" + filePath.substring(prefixIndex + prefix.length);

            console.log('uploading :: ', aws_file_location, mime.lookup(filePath))

            const command = new PutObjectCommand({
                Bucket: bucket,
                Key: aws_file_location,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath)
            })

            await s3Client.send(command)
            console.log('uploaded', filePath)
        };

        await Promise.all(transcodedVideoFolderContents.map(uploadFile));

        console.log("UPLOAD FINISHED")
    }
    catch (err) {
        console.log("ERROR :: ")
        console.log(err)
    }
    finally {
        console.log("FINALLY BLOCK")
    }

}


init();
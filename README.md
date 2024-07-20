# HLS Video Transcoder: Cloud
This project allows you to easily transcode video files uploaded into the S3 bucket, into a format compatible with HLS (HTTP Live Streaming). This enables smooth streaming of your videos across various platforms and devices.

# High-Level Architecture

![High Level Design](/media/hld.png)

# Demo: Video transcoding

The included video demonstrates how our application streams videos efficiently. You'll see how it loads only the relevant segments based on the user's playback position. Additionally, switching video quality triggers segment reloading and adapts the file size accordingly.



<URL>



# Want to run this project?

## Prerequisite
To run this project, you'll need:

- An AWS account
- IAM users with proper access (check details in /api-server/env_file.js)
- An EC2 instance
- 2 S3 bucket
- 2 standard SQS queue
- 1 Lambda function
- 1 ECS Cluster
- 1 ECR (to store your docker image)

## Steps to follow 

- Clone the repository: `git clone https://github.com/Sumit0709/hls-video-transcoding-cloud.git`
- Create all AWS prerequisite
- Start EC2 instance
- Add original video S3 bucket PUT event as trigger point for Lambda 

## Note:
- Ensure your AWS IAM user have the necessary permissions to perform their tasks

### Your video will be transcoded and uploaded into your transcoded video s3 bucket.

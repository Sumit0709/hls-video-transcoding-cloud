import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    # print(json.dumps(event));
    
    body = json.dumps(event["Records"][0]);
    
    client = boto3.client("sqs")
    response = client.send_message(
        QueueUrl = "URL of original video detail SQS",
        MessageBody= body
        )
    return {
        'statusCode': response["ResponseMetadata"]["HTTPStatusCode"],
        'body': json.dumps(response["ResponseMetadata"])
    }
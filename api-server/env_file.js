/**
 * Create an .env file with the following environment variable
 */


/*
AWS_REGION = region of your ecs cluster
AWS_ACCESS_KEY = IAM user having privilage to run the container in ecs cluster
AWS_SECRET_ACCESS_KEY = IAM user having privilage to run the container in ecs cluster

CLUSTER = ARN of the ECS cluster where our docker container will run
TASK = ARN of the ECS cluster task


AWS_ACCESS_KEY_DOWNLOAD = IAM user having read access to your original video bucket
AWS_SECRET_ACCESS_KEY_DOWNLOAD = IAM user having read access to your original video bucket
AWS_BUCKET_DOWNLOAD = name of original video bucket

AWS_ACCESS_KEY_UPLOAD = IAM user having write access to transcoded video bucket
AWS_SECRET_ACCESS_KEY_UPLOAD = IAM user having write access to transcoded video bucket
AWS_BUCKET_UPLOAD = name of transcoded video bucket

AWS_SQS_URL = URL of original video detail SQS
AWS_SQS_ACCESS_KEY = IAM user having read and write access to original video detail SQS and transcoded video SQS
AWS_SQS_SECRET_ACCESS_KEY = IAM user having read and write access to original video detail SQS and transcoded video SQS

AWS_HLS_SQS_REGION = Region of transcoded video details SQS
AWS_HLS_SQS_URL = URL of transcoded video SQS
*/
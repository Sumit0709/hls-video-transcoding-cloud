var cron = require('node-cron');
const read_message_from_hls_sqs = require('../read_message_from_hls_sqs');

const read_hls_sqs_cronjob = async () => {
    console.log("CRON");

    const sec = (new Date()).getSeconds();
    console.log("SECOND == ", sec);

    if(sec < 20){
        console.log('Reading data instantly from HLS SQS at ', Date());
        read_message_from_hls_sqs()
    }

    const start_read_sqs_cronjob = cron.schedule('*/1 * * * *', () => {
        console.log('Reading data from HLS SQS at ', Date());
        read_message_from_hls_sqs()
    },
    {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });

    start_read_sqs_cronjob.start();

    // If we add some cache to store read value, then we can stop cronjob when we have handful of request to process
}

module.exports = read_hls_sqs_cronjob;
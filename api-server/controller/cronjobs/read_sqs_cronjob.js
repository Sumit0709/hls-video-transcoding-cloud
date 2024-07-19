var cron = require('node-cron');
const read_data_from_sqs = require('../read_data_from_sqs');

const read_sqs_cronjob = async () => {
    console.log("CRON");

    const sec = (new Date()).getSeconds();
    console.log("SECOND == ", sec);

    if(sec < 20){
        console.log('Reading data instantly from SQS at ', Date());
        read_data_from_sqs()
    }

    const start_read_sqs_cronjob = cron.schedule('*/1 * * * *', () => {
        console.log('Reading data from SQS at ', Date());
        read_data_from_sqs()
    },
    {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });

    start_read_sqs_cronjob.start();

    // If we add some cache to store read value, then we can stop cronjob when we have handful of request to process
}

module.exports = read_sqs_cronjob;
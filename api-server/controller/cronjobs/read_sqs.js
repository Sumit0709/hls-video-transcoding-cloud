var cron = require('node-cron');

const read_sqs_cronjob = async () => {
    console.log("CRON");

    const read_sqs = cron.schedule('* */1 * * * *', () => {
        console.log('running a task every 1 min');
    },
    {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });

    read_sqs.start();

    // If we add some cache to store read value, then we can stop cronjob when we have handful of request to process
}

module.exports = read_sqs_cronjob;
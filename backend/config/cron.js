// cronjob to keep the server alive
const cron = require('cron');
const https = require('https');

const url = `https://jira-backend.onrender.com`
const job = new cron.CronJob(`*/14 * * * *`, function(){
    console.log('keeping server alive');

    https.get(url, (res) => {
        if(res.statusCode === 200){
            console.log('server-live')
        }else{
            console.error('server-shut')
        }
    })
    .on('error', (err) => {
        console.error(err.message);
    });
});

module.exports = job
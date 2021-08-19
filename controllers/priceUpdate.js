const { share } = require('../models');

var CronJob = require('cron').CronJob;
var job = new CronJob(
  '* * 1 * * *',
  async function () {
    var precision = 100; // 2 decimals
    var randomnum = parseFloat(
      Math.floor(
        Math.random() * (0.1 * precision - 1 * precision) + 1 * precision
      ) /
        (1 * precision)
    );
    await share.update(
      { rate: randomnum },
      {
        where: {
          code: 'AAA',
        },
      }
    );
    console.log('Price updated');
  },
  null,
  true
);
module.exports = job.start();

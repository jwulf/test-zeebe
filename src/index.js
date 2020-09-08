'use strict';

const Dayjs = require('dayjs');
const { ZBClient, Duration } = require('zeebe-node');
const zbc = new ZBClient(process.env.ZEEBE_ADDRESS, { longPoll: Duration.minutes.of(10) });

zbc.createWorker("worker-test", (job, complete) => {
    console.log(job.variables);
    complete.success({ result: 'ok' });
});
  
setInterval(() => {
    console.log(
      Dayjs().toString(),
      "Memory: " + (process.memoryUsage().rss / 1024 / 1024).toFixed(1) + "M"
    );
}, Duration.milliseconds.from(Duration.minutes.of(5)));
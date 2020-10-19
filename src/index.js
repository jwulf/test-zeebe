'use strict';

const Dayjs = require('dayjs');
const { ZBClient, Duration } = require('zeebe-node');
const zbc = new ZBClient(process.env.ZEEBE_ADDRESS, { longPoll: Duration.minutes.of(10) });
const memwatch = require("@airbnb/node-memwatch");

var hd = new memwatch.HeapDiff();

function stats() {
  const hde = hd.end();
  console.log(new Date().toString());
  console.log(JSON.stringify(hde, null, 2));
  hd = new memwatch.HeapDiff();
}

memwatch.on("stats", stats);

zbc.deployWorkflow('test-zeebe.bpmn').then(() =>
  zbc.createWorker("worker-test", (job, complete) => {
      console.log(job.variables);
      complete.success({ result: 'ok' });
}));
  
setInterval(() => {
    console.log(
      Dayjs().toString(),
      "Memory: " + (process.memoryUsage().rss / 1024 / 1024).toFixed(1) + "M"
    );
}, Duration.milliseconds.from(Duration.minutes.of(5)));
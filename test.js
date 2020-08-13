const {PubSub} = require('@google-cloud/pubsub');
const axios = require("axios").default;
const { PerformanceObserver, performance } = require('perf_hooks');
const os = require("os");

const TIMESTAMP = Date.now();
const data = {
  id: "test",
  status: "offline",
  lastConnection: TIMESTAMP
};

const dataBuffer = Buffer.from(JSON.stringify(data));

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration);
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

performance.measure('Start to Now');

const projectId = 'messaging-service-180514';
const topicName = 'display-connection-status-test';

const pubSubClient = new PubSub({projectId});

process.on("SIGPIPE", ()=>{
  performance.mark("WebhookTime");
  axios.get("https://rvacore-test.appspot.com/displaystatuswebhook")
  .then(()=>{
    performance.measure("WebhookTime to now", "WebhookTime");
    console.log(`Webhook called`);
  })
  .catch(e=>{
    console.log("error");
    console.error(e);
  });
});

process.on("SIGUSR2", ()=>{
  performance.mark("PublishTime");
  pubSubClient.topic(topicName).publish(dataBuffer)
  .then(msgId=>{
    performance.measure("Publish time to now", "PublishTime");
    console.log(`Message published.`);
  })
  .catch(e=>{
    console.log("error");
    console.error(e);
  })
});

process.on("error", console.error);

process.stdin.resume();

console.log("PID: ", process.pid);

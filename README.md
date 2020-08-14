## Google PubSub Test

Publishes to a PubSub topic on *SIGUSR2*.

Can also call a url directly on *SIGPIPE* for comparison.

### Usage

In a google cloud shell, 

``` bash
nvm install v14
node test
```

The node process will start and output its PID.

In a separate cloud shell terminal:

``` bash
kill -s SIGUSR2 [PID]
kill -s SIGPIPE [PID]
```

### Sample Result

A Google Cloud Shell was used to compare direct App Engine webhook calls to publishing a PubSub topic.

The App Engine response time is always greater than the webhook response time. And the App Engine response time is highly variable.

![test](https://github.com/Rise-Vision/google-pub-sub-test/blob/master/test.png)

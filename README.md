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

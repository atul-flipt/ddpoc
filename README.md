# ddpoc
## Start Datadog agent with TCP port forwarding
```Bash
```

Now agent is available on `localhost:8126` on the host.

## Start Flask app
```Shell
cd flask
docker build -t flask .
docker run -d --name flask --restart always -p 5010:5010 -e DD_AGENT_HOST=dockerhost flask
```

## Start Nodejs
```Shell
DD_AGENT_HOST=localhost DD_TRACE_AGENT_PORT=8126 DD_LOGS_INJECTION=true node server.js &
```
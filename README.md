# ddpoc
## Start Datadog agent with TCP port forwarding
```Bash
docker run -d --name dd-agent --restart always -p 8126:8126 -e DD_APM_ENABLED=true -e DD_APM_NON_LOCAL_TRAFFIC=true -e DD_API_KEY=<API-KEY>  gcr.io/datadoghq/agent:latest
```

Now agent is available on `localhost:8126` on the host.

## Start Flask app
```Shell
cd flask
docker build -t flask .
docker run -d --name flask --restart always -p 5010:5010 -e DD_AGENT_HOST=host.docker.internal flask
```

# ddpoc
## Start Datadog agent with TCP port forwarding
```Bash
docker run -d --name dd-agent --restart always -p 127.0.0.1:8126:8126/tcp -e DD_APM_ENABLED=true -e DD_APM_NON_LOCAL_TRAFFIC=true -e DD_API_KEY=<API-KEY>  gcr.io/datadoghq/agent:latest
```

Now agent is available on `localhost:8126` on the host.

## Start Flask app
```Shell
cd flask
. venv/bin/activate  
pip3 install -r requirements.txt
gunicorn -w 4 -b 127.0.0.1:4000 wsgi:app 
```

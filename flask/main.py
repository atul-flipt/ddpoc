from ddtrace import patch_all; patch_all(logging=True)
from flask import Flask, request
import os
import json
import logging
from pythonjsonlogger import jsonlogger
from ddtrace import tracer

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
          '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
          '- %(message)s')
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
json_handler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter(fmt='%(asctime)s %(levelname)s %(name)s %(dd.service)s %(dd.env)s %(dd.version)s %(dd.trace_id)s %(dd.span_id)s %(message)s')
json_handler.setFormatter(formatter)
logger.addHandler(json_handler)

tracer.configure(
    hostname=os.environ.get('DD_AGENT_HOST'),
    port="8126",
)
app = Flask(__name__)

@app.route('/')
def hello():
    log.debug("flask: received request")
    return json.dumps(dict(request.headers))
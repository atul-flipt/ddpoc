from ddtrace import patch_all; patch_all(logging=True)
from flask import Flask
import os
import logging
from ddtrace import tracer

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
          '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
          '- %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger(__name__)
log.level = logging.INFO

tracer.configure(
    hostname="localhost",
    port="8126",
)
app = Flask(__name__)

@app.route('/')
@tracer.wrap()
def hello():
    return "Hello World!"
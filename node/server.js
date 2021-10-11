import tracer from 'dd-trace';
tracer.init({
  logInjection: true
});
tracer.use('http', { splitByDomain: true });
import { FORMAT_HTTP_HEADERS } from 'opentracing'
import express from 'express';
import invoke from './service.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('DD POC - Node\n');
  const span = tracer.startSpan("span");
  const headersObj = {};
  tracer.inject(span, FORMAT_HTTP_HEADERS, headersObj);
  invoke(res);
  console.log(headersObj);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
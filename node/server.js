import logger from './logger.js'
import tracer from 'dd-trace';
tracer.init({
  logInjection: true,
  logger
});
import axios from 'axios';
import express from 'express';
import expressWinston from 'express-winston';
import { FORMAT_HTTP_HEADERS } from 'opentracing'

const app = express();
const port = 3000;

const invoke = function invoke(r) {
  logger.log({
    level: 'info',
    message: "Calling flask @ dockerhost:5010"
  });
  const span = tracer.startSpan("span");
  const headers = {};
  tracer.inject(span, FORMAT_HTTP_HEADERS, headers);
  axios.get('http://dockerhost:5010/', {
    headers
  }).then(function (res) {
    logger.log({
      level: 'info',
      message: res.data
    });
    r.send(res.data);
  }).catch(function (e) {
    logger.log({
      level: 'error',
      message: e.message
    });
  });
}

app.use(expressWinston.logger({
  winstonInstance: logger
}));

app.use(expressWinston.errorLogger({
  winstonInstance: logger
}))

app.get('/', (req, res) => {
  console.log('DD POC - Node\n');
  invoke(res);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
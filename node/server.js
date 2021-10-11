import logger from './logger.js'
import tracer from 'dd-trace';
tracer.init({
  logInjection: true,
  logger
});
tracer.use('http', { splitByDomain: true });
import http from 'http';
import express from 'express';
import expressWinston from 'express-winston';

const app = express();
const port = 3000;

const invoke = function invoke(r) {
  logger.log({
    level: 'info',
    message: "Calling flask @ dockerhost:5010"
  });
  http.get({
    host: 'dockerhost',
    port: 5010,
    path: '/',
    headers
  }, function (res) {
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      logger.log({
        level: 'info',
        message: body
      });
      r.send(body);
    });
  }).on('error', function (e) {
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
import logger from './logger.js'
import tracer from 'dd-trace';
tracer.init({
  logInjection: true,
  logger
});
tracer.use('http', { splitByDomain: true });
import express from 'express';
import expressWinston from 'express-winston';
import invoke from './service.js';

const app = express();
const port = 3000;

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
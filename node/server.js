import tracer from 'dd-trace';
tracer.init({
  logInjection: true
});
tracer.use('http', { splitByDomain: true });
import express from 'express';
import invoke from './service.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('DD POC - Node\n');
  invoke(res);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
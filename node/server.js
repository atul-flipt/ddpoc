import tracer from 'dd-trace';
tracer.init(); // initialized in a different file to avoid hoisting.
import express from 'express';
import invoke from './service.js';

const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log('DD POC - Node\n')
  invoke()
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
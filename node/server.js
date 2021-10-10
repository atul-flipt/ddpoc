import express from 'express';
import invoke from './service.js';
import ddtrace from 'dd-trace'

const app = express()
const port = 3000

const tracer = ddtrace.init();

app.get('/', (req, res) => {
  console.log('DD POC - Node\n')
  invoke()
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
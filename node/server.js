import express from 'express';
import invoke from './service.js';
import ddtrace from 'dd-trace'

const app = express()
const port = 3000

const tracer = ddtrace.init();

app.get('/', (req, res) => {
  res.send('Hello World!')
  invoke()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
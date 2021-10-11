import tracer from 'dd-trace';
import { FORMAT_HTTP_HEADERS } from 'opentracing'
import * as http from 'http';

export default function invoke(r) {
  console.log("Calling flask @ localhost:5010");
  const span = tracer.startSpan("span");
  const headers = {};
  tracer.inject(span, FORMAT_HTTP_HEADERS, headers);
  http.get({
    host: 'localhost',
    port: 5010,
    path: '/',
    headers
  }, function (res) {
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      console.log(body);
      r.send(body);
    });
  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });



}


import * as http from 'http';

export default function invoke(r) {
  console.log("Calling flask @ localhost:5010")
  http.get({
    host: 'localhost',
    port: 5010,
    path: '/'
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
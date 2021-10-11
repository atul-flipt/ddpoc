

import request from 'request'



export default function invoke(res) {
  console.log("Calling flask @ localhost:5010")
  request('http://localhost:5010', { json: true }, (err, r, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.data);
    res.send('Hello World!');
  });



}
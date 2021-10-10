
 
import request from 'request'



export default function invoke(){
    console.log("Calling flask @ localhost:5010")
    request('https://localhost:5010', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      console.log(body.url);
      console.log(body.data);
    });

    

}
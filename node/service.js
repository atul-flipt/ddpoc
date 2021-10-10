
import https from 'http'





export default function invoke(){
    console.log("Calling flask @ localhost:5010")
    
    const options = {
        hostname: 'localhost',
        port: 5010,
        path: '/',
        method: 'GET'
      }
      
      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', d => {
          process.stdout.write(d)
        })
      })
      req.on('error', error => {
        console.error(error)
        })

    

}
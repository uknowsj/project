//1.서버만 띄움
const app = require('./app.js');
const http =require('http');
const port = 3000;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log('Express Server is ready on ',port);
});
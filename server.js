const app = require('./backend/app'); 
const http = require('http'); // the package that allows to create a web server

const port = process.env.PORT || 8000;


app.set('port', port)
const server = http.createServer(app);

server.listen(port);
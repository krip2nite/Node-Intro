import http from 'node:http';
const server = http.createServer();
const port = 3500;
server.listen(port, () => console.log("listening on port " + port));
server.on("request", (req, res) => {
    res.statusCode = 200;
    let data = "";
    req.on("data", chunk => data += chunk)
    req.on("end", ()=> {res.write(data); res.end();})

})
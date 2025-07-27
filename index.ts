import { write } from 'node:fs';
import http from 'node:http';
const server = http.createServer();
const port = 3500;
server.listen(port, () => console.log("listening on port " + port));
server.on("request", (req, res) => {
    res.statusCode = 200;
    const tockens = req.url.split("/")
    let response: string = "";
    switch(tockens[1]){
        case "add": response = (+tockens[2] + +tockens[3]).toString(); break;
        case "sub": response = (+tockens[2] - +tockens[3]).toString(); break;
        case "div": response = (+tockens[2] / +tockens[3]).toString(); break;
        case "mul": response = (+tockens[2] * +tockens[3]).toString(); break;
    }
    res.write(response);
    res.end();
})
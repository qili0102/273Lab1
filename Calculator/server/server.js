import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';

function requestHandler(request, response) {
    let requestedResource = path.join(
        __dirname,
        '../public',
        url.parse(request.url).pathname
    );
    console.log(url.parse(request.url).pathname);
    if (url.parse(request.url).pathname=="/" || url.parse(request.url).pathname=="/bundle.js") {
        fs.exists(requestedResource, function (exists) {
            if (!exists) {
                response.writeHead(404, {"Content-Type":"text/plain"});
                response.write("404 Not Found\n");
                response.end();
                return;
            }
    
            if (fs.statSync(requestedResource).isDirectory()){
                requestedResource += '/index.html';
            } 
    
            fs.readFile(
                requestedResource,
                "binary",
                function (err, file) {
                    if (err) {
                        response.writeHead(500, {"Content-Type": "text/plain"});
                        response.write(err+"\n");
                        response.end();
                        return;
                    }
    
                    const contentTypesByExtension = {
                        '.html': "text/html",
                        '.css' : "text/css",
                        '.js': "text/javascript"
                    };
    
                    const headers = {};
                    const contentType = contentTypesByExtension[path.extname(requestedResource)];
    
                    if(contentType){
                        headers["Content-Type"] = contentType;
                    }
    
                    response.writeHead(200, headers);
                    response.write(file, "binary");
                    response.end();
                }
            );
        });
    }
    
    if (url.parse(request.url).pathname=="/cal" &&request.method == 'POST') {
        var jsonString = '';
        var result;

        request.on('data', function (data) {
            jsonString += data;
        });

        request.on('end', function (err) {
            console.log(JSON.parse(jsonString));
            console.log(JSON.parse(jsonString).equation);
            result = {data :(eval(JSON.parse(jsonString).equation)+'')};
            console.log(result);

            response.writeHead(200, {"Content-Type":"application/json"});
            response.write(JSON.stringify(result));
            response.end();
        });
    }
}

const server = http.createServer(requestHandler);
const portNumber = 3030;
server.listen(portNumber, function(){
    console.log(`Server listening on port ${portNumber}`);
});
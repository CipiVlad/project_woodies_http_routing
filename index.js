//import modules
const fs = require("fs");
const http = require("http");

// sync fs read ---> to stop processing because of wrong request
const errorHtml = fs.readFileSync("assets/error.html");

// function for sending html or error page
function sendFileOrError(path, response) {
  fs.readFile(path, (err, data) => {
    if (err) {
      response.end(errorHtml);
      return;
    }
    response.end(data.toString());
  });
}

// create a new server instance
const server = http.createServer((request, response) => {
  console.log("new request income:", request.method, request.url);

  // logic
  if (request.url === "/") {
    sendFileOrError("assets/home.html", response);
  } else {
    const filePath = "assets/" + request.url;
    sendFileOrError(filePath, response);
  }
});
const port = 8000;
server.listen(port, () => console.log("listening on port:", port));

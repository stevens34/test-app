const express = require('express');
const app = express();
const port = 5000;

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: '/index.html'});      //server responds by sending the index.html file to the client's browser
                //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.listen(port, () => {
    console.log(`Now listen on port ${port}`);
})
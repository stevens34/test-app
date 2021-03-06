const express = require('express');
const app = express();
const port = 5000;
const { join } = require('path');
const xl = require('excel4node');
const { fs } = require('memfs');

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', { root: __dirname });      //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.post('/', (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.log(error)
    }

    return;
})


app.listen(process.env.PORT || port, (error) => {
    console.log(`Now listen on port ${port}`);

    const json = {
        test1: 'test1',
        test2: 'test2',
        test3: 'test3'
    }

    if (error) {
        console.log(error);
    }
})
const express = require('express');
const app = express();
const port = 5000;
const {join} = require('path');
const xl = require('excel4node');

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', { root: __dirname });      //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.post('/', (req, res) => {
    console.log("hello!!!!");

    const Ftp = require('ftp');
    const XLSX = require('xlsx');
    const sourceFile = XLSX.readFile(join(__dirname, 'Allergen_Information.xlsx'));
    const sourceData = XLSX.utils.sheet_to_json(sourceFile.Sheets['Property Values']);
    const newWS = XLSX.utils.aoa_to_sheet(masterArr);
    const newwb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newwb, newWS, "Master Sheet");
    XLSX.writeFile(newwb, "NewItemType.xlsx");
    const ftpClient = new Ftp();
    ftpClient.on('ready', function () {
        ftpClient.put('./CopiedProduct123.pdf', '/OCR_Automation/CopiedProduct123.pdf', function (err, list) {
            if (err) throw err;
            ftpClient.end();
        });
    });
    ftpClient.connect({
        'host': 'ftp.salsify.com',
        'user': 'gournay_consulting',
        'password': "sKdAN9RDk9SD",
    });

    try {
        let wb = new xl.Workbook;
        var ws = wb.addWorksheet('Sheet 1');

        res.status(200).send({
            status: "success",
            data: "test"
        });
    } catch (error) {
        res.status(418).send({
            status: "Error",
            data: error.message
        });
    }

    return;
})

// const router = require('express').Router();
// router.post('/', async (req, res) => {
//     console.log('Hello!!!!!');
// });

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
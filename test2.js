const FTPClient = require('ftp'); //importing the FTP module to read files from our FTP Server
const stream = require('node:stream');
const fs = require('fs');
// const arrayCleaner=require('./arrayCleaner');
// const XLSX= require('xlsx');
var c = new FTPClient();

let masterArray = new Array()
const getFilesFromFTP = async () => {
    c.on('ready', async function () {

        var newMasterArray = new Array(); //store the objects for all the files

        c.list('./OCR_Automation/GournayConsulting', function (err, list) {
            if (err) throw err;
            // console.log("This is the list of all the files in the Directory: ", list);
            // let newMasterArray=new Array(); //store the objects for all the files

            for (var i = 0; i < list.length; i++) {
                (async (i) => {
                    const name = list[i].name;
                    if (name.includes("OCR")) {
                        await new Promise(async (resolve, reject) => {
                            newMasterArray.push("test");
                             c.get('./OCR_Automation/GournayConsulting/' + name, function (err, stream) {
                                if (err) {
                                    console.log(err);
                                };
                                if (!err) {
                                    stream.on('data', function (chunk) {
                                        masterArray = chunk.toString().split('\n');
                                        for (var key in masterArray) {
                                            if (masterArray[key].length === 0) {
                                                masterArray.splice(key, 1);
                                            }
                                        }
                                        const headers = masterArray[0].split(',');
                                        masterArray.splice(0, 1);
                                        // console.log("Headers :",headers);
                                        // console.log(masterArray);
                                        //looping throught to create the object
                                        for (var key in masterArray) {
                                            let tempDict = new Object();
                                            const tempValues = masterArray[key].split(',');
                                            for (var key2 in tempValues) {
                                                tempDict[headers[key2]] = tempValues[key2];
                                            }
                                            newMasterArray.push(tempDict);
                                        }
                                    });
                                    // console.log(newMasterArray);
                                }
                            });

                            resolve("yes");
                        });
                        console.log("done!");
                        console.log(newMasterArray);
                    }
                }).call(this, i);
            }
            // console.log(newMasterArray);
            c.end();
        });
        // c.end();
    });
    // console.log(newMasterArray);



    c.on('error', function (err) {
        console.log(err)
    });
    c.connect({
        host: "ftp.salsify.com",
        user: "gournay_consulting",
        password: "sKdAN9RDk9SD"
    });
}
console.log("This is working bro");
getFilesFromFTP();
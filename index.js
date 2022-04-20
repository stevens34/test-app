const express = require('express');
const app = express();
const port = 5000;
const memfs = require('memfs');
const fs = require('fs')
const xl = require('excel4node');

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', { root: __dirname });      //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.post('/', (req, res) => {
    console.log("hello!!!!");

    const orgId = "s-2fffc3fc-fb93-4daf-9ef1-fa4f0d61462d";

    const url = `https://app.salsify.com/api/orgs/${orgId}/imports`;

    const config = {
        headers: { Authorization: `Bearer _WJ3GJ57CXFXSJjV-5OTU8VcOeRC6NnzLJ__5jO7cyM` }
    };

    const gctSandboxBody = {
        "import": {
            "name": "Test Excel Import",
            "import_source": {
                "type": "ftp_import_source",
                "file": "/Public/cambridgeTesting.xlsx",
                "host": "ftp.salsify.com",
                "port": "21",
                "username": "gournay_consulting",
                "password": "sKdAN9RDk9SD",
                "protocol": "ftp"
            },
            "import_format": {
                "type": "product_import_format",
                "import_mode": "changeset",
                "property_value_mode": "replace",
                "column_mappings": {
                    "GTIN": {
                        "target_attribute": "GTIN",
                        "role": "product_id",
                        "data_type": "string",
                        "auto_create_enumerated_values": false,
                        "quantity_separator": ":"
                    },
                    "productFlavor": {
                        "target_attribute": "productFlavor",
                        "data_type": "string",
                        "auto_create_enumerated_values": false,
                        "quantity_separator": ":"
                    },
                    "brandId": {
                        "target_attribute": "brandId",
                        "data_type": "string",
                        "auto_create_enumerated_values": false,
                        "quantity_separator": ":"
                    },
                    "productSize": {
                        "target_attribute": "productSize",
                        "data_type": "string",
                        "auto_create_enumerated_values": false,
                        "quantity_separator": ":"
                    },
                    "productSizeUOM": {
                        "target_attribute": "productSizeUOM",
                        "data_type": "string",
                        "auto_create_enumerated_values": false,
                        "quantity_separator": ":"
                    },
                    "imageURL": {
                        "target_attribute": "imageURL",
                        "data_type": "digital_asset",
                        "auto_create_enumerated_values": false,
                        "quantity_separator": ":"
                    }
                }
            }
        }
    };

    try {
        const responseReadyImport = await Axios.post(url, gctSandboxBody, config);

        console.log(responseReadyImport.data.id);

        const startImportURL = `https://app.salsify.com/api/orgs/${orgId}/imports/${responseReadyImport.data.id}/runs`;

        const responseStartImport = await Axios.post(startImportURL, {}, config);

        console.log(responseStartImport);

        return res.status(200).send({
            status: 'success2',
            data: responseReadyImport.data.id
        });
    } catch (error) {
        return res.status(418).send({
            status: 'error',
            data: error.message
        });
    }
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
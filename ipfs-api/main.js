const express = require('express');
const app = express();
const { create, CID } = require('ipfs-http-client');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');

const ipfs = create();



app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());
app.use(cors());
app.get('/', (req, res) => {
    res.send({
        data: "Hello to the world of IPFS"
    });
})

app.get('/get', async (req, res) => {
    // console.log(req.body, req.query)
    const { cid } = req.query;
    console.log(cid);
    let data;
    for await (const chonk of ipfs.cat(CID.parse(cid))) {
        console.log(chonk)
    }
    return res.status(200).send(data);
})

app.post('/upload', async (req, res) => {
    // console.log(req.files, req.body, req.params);
    console.log(req.files.file);
    const file = req.files.file;
    const data = file.data;
    const fileName = file.name;
    const filePath = 'files\\' + fileName;
    console.log(filePath);
    // console.log(file, fileName, filePath);
    file.mv(filePath, async (err) => {
        if (err) {
            console.log('Error: failed to download file');
            return res.status(500).send(err);
        }
    });

    const fileHash = await addfile(fileName, data);
    fs.unlink(filePath, (err) => {
        if (err) console.log(err);
    });

    // return res.status(201).send('Oh my this went perfecctly');
    console.log(fileHash);
    return res.status(201).send(`http://localhost:8080/ipfs/${fileHash}`);
})

const addfile = async (filename, data) => {
    try {
        const obj = await ipfs.add({path: filename, content: data });
        console.log(obj);
        return obj.cid.toString();
    } catch (e) {
        console.log(e);
        return "";
    }

}

app.listen(3001, () => {
    console.log("SERVER IS RUNNIGN");
})
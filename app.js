import express from 'express';
import multer from 'multer';
import 'dotenv/config';

import uploadfile from './s3.js';

const app = express();
app.use(multer().any());

app.post('/upload', async (req, res) => {
    const file = req.files[0];
    const resp = await uploadfile(file);
    res.send({
        statusCode: 200,
        message: 'Image uploaded successfully',
        data: resp,
    });
});

app.listen(9000, () => {
    console.log('---------------------------------');
    console.log(`🚀 App is listening on 9000 🚀`);
    console.log('---------------------------------');
});

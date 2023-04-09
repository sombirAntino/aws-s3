import aws from 'aws-sdk';
import 'dotenv/config';

aws.config.update({
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();

let uploadfile = async (file) => {
    return new Promise((res, rej) => {
        let params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            ACL: 'public-read',
            Key: file.originalname,
            Body: file.buffer,
        };
        s3.upload(params, (err, data) => {
            if (err) rej({ Error: err });

            res({ fileLocation: data.Location, fileKey: data.Key });
            return data;
        });
    });
};

export default uploadfile;

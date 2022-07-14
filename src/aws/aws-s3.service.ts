import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsS3Service {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async uploadFile(file) {
    const { originalname } = file;

    const rightNow = new Date();
    rightNow.setMilliseconds(0);
    const res = rightNow.toISOString().replace(/-/g, '');

    const newFileName = res + '-' + originalname;

    const response = await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      newFileName,
      file.mimetype,
    );

    return response['Location'];
  }

  async s3_upload(file, bucket: string, name: string, mimetype: string) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      return await this.s3.upload(params).promise();
    } catch (e) {
      console.log(e);
    }
  }
}

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { awsS3Configuration } from 'src/config';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  private bucketName = process.env.AWS_S3_PUBLIC_BUCKET;
  private regionName = process.env.AWS_S3_REGION;

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileExtension = path.extname(file.originalname);

    const fileName = `${uuid()}${fileExtension}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await awsS3Configuration.send(new PutObjectCommand(uploadParams));

    return `https://${this.bucketName}.s3.${this.regionName}.amazonaws.com/${fileName}`;
  }
}

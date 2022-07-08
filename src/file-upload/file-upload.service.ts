import { BadRequestException } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { AwsApp } from './aws/aws-app';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUploadService {

  private AWS_S3_BUCKET: string;

  constructor(
    @Inject(AwsApp) private readonly awsApp: AwsApp,
    private readonly configService: ConfigService
  ) {
    this.AWS_S3_BUCKET = this.configService.get("AWS_S3_BUCKET");
  }

  async upload(dataBuffer: Buffer, filename: string)
  {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    }

    try {
      const s3Response = await this.awsApp.getS3().upload(params).promise();
      return s3Response;
    } catch (e) {
      throw new BadRequestException(`Something went wrong when uploading files`);
    }
  }
}

import {Injectable} from "@nestjs/common";
import * as AWS from "aws-sdk";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsApp {
  private s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    const awsConfig = {
      region: this.configService.get("AWS_REGION"),
      endpoint: this.configService.get("AWS_ENDPOINT"),
      accessKeyId:this.configService.get("AWS_ACCESS_KEY_ID"),
      secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
      s3ForcePathStyle: this.configService.get("AWS_FORCE_PATH_STYLE"),
      signatureVersion: this.configService.get("AWS_SIGNATURE_VERSION"),
    }

    this.s3 = new AWS.S3(awsConfig);
  }

  getS3 = (): AWS.S3 => {
    return this.s3;
  }
}

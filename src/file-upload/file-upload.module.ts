import { Module } from '@nestjs/common';
import { AwsApp } from './aws/aws-app';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  controllers: [FileUploadController],
  providers: [
    AwsApp,
    FileUploadService
  ]
})
export class FileUploadModule {}

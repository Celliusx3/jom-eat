import { Controller, Post, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { FirebaseAuthGuard } from './../guards/firebase-auth.guard';

@Controller('file-upload')
@UseGuards(FirebaseAuthGuard)
export class FileUploadController {

  constructor(
    private readonly fileUploadService: FileUploadService, 
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileUploadService.upload(file.buffer, file.originalname);
  }
}

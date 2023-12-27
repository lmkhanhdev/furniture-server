import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BillboardService } from './billboard.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('billboard')
export class BillboardController {
    constructor(private readonly billboardService: BillboardService) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("image"))
    async upload(@UploadedFile() file) {
       return await this.billboardService.uploadImage(file);
    }
}

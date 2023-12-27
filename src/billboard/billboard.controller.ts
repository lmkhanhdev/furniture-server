import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BillboardService } from './billboard.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateBillboardDto,
  UpdateBillboardDto,
} from './dto/createBillboardDto';
import { Billboard } from 'src/entities/billboard.entity';

@Controller('billboard')
export class BillboardController {
  constructor(private readonly billboardService: BillboardService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.billboardService.uploadFile(file);
  }

  @Get()
  async getAllBillboards(): Promise<Billboard[]> {
    return this.billboardService.getAllBillboards();
  }

  @Get(':id')
  async billboardFindOne(@Param('id') id: number): Promise<Billboard> {
    return this.billboardService.billboardFindOne(id);
  }

  @Post('new-billboard')
  async create(
    @Body() createBillboardDto: CreateBillboardDto,
  ): Promise<Billboard> {
    return this.billboardService.createBillboard(createBillboardDto);
  }

  @Put(':id/update-billboard')
  async updateBillboard(
    @Param('id') id: number,
    @Body() updateBillboardDto: UpdateBillboardDto,
  ) {
    return this.billboardService.updateBillboard(id, updateBillboardDto);
  }

  @Delete(':id')
  async deleteBillboard(@Param('id') id: number): Promise<void> {
    return this.billboardService.deleteBillboard(id);
  }
}

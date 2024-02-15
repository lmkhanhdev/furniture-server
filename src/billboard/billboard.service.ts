import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { Billboard } from 'src/entities/billboard.entity';
import { Repository } from 'typeorm';
import {
  CreateBillboardDto,
  UpdateBillboardDto,
} from './dto/createBillboardDto';

@Injectable()
export class BillboardService {
  constructor(
    @InjectRepository(Billboard)
    private readonly billboardRipo: Repository<Billboard>,
  ) {}
  S3_BUCKET_NAME = 'sondinh-furniture';
  s3 = new AWS.S3({
    accessKeyId: 'AKIA3OE2ITGJW3RP7R6Y',
    secretAccessKey: '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',
    region: 'ap-southeast-2',
  });

  async uploadFile(file) {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.S3_BUCKET_NAME,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.S3_REGION,
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }

  async getAllBillboards(): Promise<Billboard[]> {
    return await this.billboardRipo.find();
  }

  async billboardFindOne(id: number): Promise<Billboard> {
    const billboard = await this.billboardRipo.findOne({ where: { id: id } });
    if (!billboard) {
      throw new NotFoundException(`Billboard with id ${id} not found`);
    }
    return billboard;
  }

  async createBillboard(
    createBillboardDto: CreateBillboardDto,
  ): Promise<Billboard> {
    const billboard = this.billboardRipo.create(createBillboardDto);
    return await this.billboardRipo.save(billboard);
  }

  async updateBillboard(
    id: number,
    updateBillboardDto: UpdateBillboardDto,
  ): Promise<Billboard> {
    const billboard = await this.billboardRipo.findOne({ where: { id: id } });
    if (!billboard) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateBillboardDto.name) {
      billboard.name = updateBillboardDto.name;
    }

    if (updateBillboardDto.images) {
      billboard.images = updateBillboardDto.images;
    }

    await this.billboardRipo.save(billboard);

    return billboard;
  }

  async deleteBillboard(id: number): Promise<void> {
    const billboard = await this.billboardFindOne(id);

    await this.billboardRipo.remove(billboard);
  }

  async toggleActive(id: number): Promise<Billboard> {
    const billboard = await this.billboardRipo.findOne({ where: { id: id } });
    if (!billboard) {
      throw new NotFoundException(`Billboard with id ${id} not found`);
    }

    // Đảo ngược trạng thái active
    billboard.active = !billboard.active;

    await this.billboardRipo.save(billboard);

    return billboard;
  }
}

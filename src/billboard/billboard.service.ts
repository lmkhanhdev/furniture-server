import { Injectable, Logger, Request, Response } from '@nestjs/common';
import { S3 } from "aws-sdk"

@Injectable()
export class BillboardService {
    async uploadImage(file) {
        const { originalname } = file
        const bucketS3 = process.env.S3_BUCKET_NAME
        await this.uploadS3(file.buffer, bucketS3, originalname)
    }

    async uploadS3(file, bucket, name) {
        const s3 = this.getS3()
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            Acl: "public-read",
        }
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if(err) {
                    Logger.error(err)
                    reject(err.message)
                }
                resolve(data)
            })
        })
    }

    getS3() {
        return new S3({
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        })
    }
}

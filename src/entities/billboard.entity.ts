import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Billboard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column("simple-array", { nullable: false})
    images: string[]
}

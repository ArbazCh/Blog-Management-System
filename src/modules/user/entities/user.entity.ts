import { Column, Entity, PrimaryGeneratedColumn, OneToMany, BaseEntity, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')

export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(password || this.password, salt);
    }
}
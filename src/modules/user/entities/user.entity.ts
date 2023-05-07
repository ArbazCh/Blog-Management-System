import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsNotEmpty } from 'class-validator';
import { Blog } from 'src/modules/blog/entities/blog.entity';

@Entity('users')

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

    @OneToMany(() => Blog, (blog) => blog.user)
    blogs: Blog[]
}
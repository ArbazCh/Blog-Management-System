import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, BeforeInsert, OneToMany, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Blog } from 'src/modules/blog/entities/blog.entity';
import { Comment } from 'src/modules/blog/entities/comment.entity';

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

    @OneToMany(() => Comment, comment => comment.user,{ onDelete: 'CASCADE' })
    comments: Comment[];

    @OneToMany(() => Blog, (blog) => blog.user)
    blogs: Blog[]
}
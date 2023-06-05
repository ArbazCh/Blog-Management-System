import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blog.entity";
import { User } from "src/modules/user/entities/user.entity";

@Entity('comment')
export class Comment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    content:string;

    @Column({nullable:true})
    userName:string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => Blog, blog => blog.comments,  { onDelete: 'CASCADE' })
    blog: Blog;

    @ManyToOne(() => User, user => user.comments)
    user: User;

}
    import { User } from 'src/modules/user/entities/user.entity';
    import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
    import { Comment } from './comment.entity';

    @Entity('blog')
    export class Blog extends BaseEntity {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        title: string;

        @Column({ default: "" })
        description: string;

        @Column({ default: "" })
        body: string

        @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        createdAt: Date;

        @ManyToOne(() => User, (user) => user.blogs)
        user: User

        @OneToMany(() => Comment, comment => comment.blog)
        comments: Comment[];

        @Column({ nullable: true })
        userId: number
    }
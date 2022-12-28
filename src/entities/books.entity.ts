import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Roles } from './roles.entity';
import { Users } from './users.entity';

@Entity({ name: 'books' })
export class Books {
    @PrimaryGeneratedColumn()
    book_id!: number;

    @Column()
    book_name!: string;

    @Column()
    description!: string;

    @Column({default:1})
    is_active!: number;

    @ManyToOne(() => Users, user => user.userid)
    @JoinColumn({ name: "author_id" })
    author_id!: Users;

    @Column()
    @CreateDateColumn()
    date_created!: Date;

    @Column()
    @UpdateDateColumn()
    date_modified!: Date;

}
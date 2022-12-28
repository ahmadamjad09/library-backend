import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Books } from './books.entity';
import { Roles } from './roles.entity';

@Entity({ name: 'users' })
export class Users {
    @PrimaryGeneratedColumn()
    user_id!: number;

    @Column()
    user_name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({default:1})
    is_active!: number;

    @ManyToOne(() => Roles, role => role.user_id)
    @JoinColumn({ name: "role_id" })
    role_id!: Roles;

    @OneToMany(() => Books, book => book.author_id)
    userid!: Books[];

    @Column()
    @CreateDateColumn()
    date_created!: Date;

    @Column()
    @UpdateDateColumn()
    date_modified!: Date;

}
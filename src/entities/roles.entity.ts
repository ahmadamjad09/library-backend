import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { Users } from './users.entity';

@Entity({ name: 'roles' })
export class Roles {
    @PrimaryGeneratedColumn()
    role_id!: number;

    @Column()
    role_name!: string;

    @Column({default:1})
    is_active!: number;

    @OneToMany(() => Users, user => user.role_id)
    user_id!: Users[];

    @Column()
    @CreateDateColumn()
    date_created!: Date;

    @Column()
    @UpdateDateColumn()
    date_modified!: Date;

}
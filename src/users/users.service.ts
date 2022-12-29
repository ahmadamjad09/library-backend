import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private usersRep: Repository<Users>
        ) { }

        async getUsers(): Promise<any> {
            return await this.usersRep.find({relations:['role_id']})
        }

        async getAuthors(): Promise<any> {
            return await this.usersRep.createQueryBuilder("users")
            .select('users.*')
            .leftJoin("roles","r","r.role_id = users.role_id")
            .where("r.role_id = 3") //author role id is 3
            .getRawMany()
        }
    
        async getUser(id:any): Promise<any> {
            return await this.usersRep.findOne({where:{user_id:id},relations:['role_id']})
        }

        async getUserByEmail(email:any): Promise<any> {
            return await this.usersRep.findOne({where:{email:email,is_active:1},relations:["role_id"]})
        }
    
        async addUser(data:any): Promise<any> {
            return await this.usersRep.save(data)
        }
    
        async editUser(id:any,data:any): Promise<any> {
            return await this.usersRep.update(id,data)
        }
    
        async blockUnblockUser(id:any,is_active:any): Promise<any> {
            return await this.usersRep.createQueryBuilder()
            .update(Users)
            .set({ is_active })
            .where("user_id = :user_id", { user_id: id })
            .execute();
        }
}

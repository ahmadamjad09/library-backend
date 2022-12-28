import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles) private rolesRep: Repository<Roles>
        ) { }

        async getRoles(): Promise<any> {
            return await this.rolesRep.find()
        }
    
        async getRole(id:any): Promise<any> {
            return await this.rolesRep.findOne({where:{role_id:id}})
        }
    
        async addRole(data:any): Promise<any> {
            return await this.rolesRep.save(data)
        }
    
        async editRole(id:any,data:any): Promise<any> {
            return await this.rolesRep.update(id,data)
        }
    
        async blockUnblockRole(id:any,is_active:any): Promise<any> {
            return await this.rolesRep.createQueryBuilder()
            .update(Roles)
            .set({ is_active })
            .where("role_id = :role_id", { role_id: id })
            .execute();
        }
}

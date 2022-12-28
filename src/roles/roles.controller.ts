import { Body, Controller, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles.entity';
import { Repository } from 'typeorm';
import { RolesService } from './roles.service';
import {Response} from 'express'
@Controller('roles')
export class RolesController {
    constructor(
        private rolesService: RolesService,
    ) { }

    @Get("/list")
    async getRoles(@Res() response:Response):Promise<any> {
        let data:any = await this.rolesService.getRoles()
        if(data && data.length > 0) {
            response.status(200).send({success:true,response:data})
        } else {
            response.status(403).send({success:false,message:"Data not found"})
        }
    }

    @Get("/:id")
    async getRole(@Res() response:Response,@Param("id") id:any):Promise<any> {
        let data:any = await this.rolesService.getRole(id)
        if(data) {
            response.status(200).send({success:true,response:data})
        } else {
            response.status(403).send({success:false,message:"Data not found"})
        }
    }

    @Post("/add")
    async addRole(@Res() response:Response,@Body() body:any):Promise<any> {
        let data:any = await this.rolesService.addRole(body)
        if(data) {
            response.status(200).send({success:true,response:"Role Added Successfully"})
        } else {
            response.status(403).send({success:false,message:"Role Not Added Successfully"})
        }
    }

    @Put("/update/:id")
    async updateRole(@Res() response:Response,@Param("id") id:any,@Body() body:any):Promise<any> {
        let data:any = await this.rolesService.editRole(id,body)
        if(data.affected > 0) {
            response.status(200).send({success:true,response:"Role Updated Successfully"})
        } else {
            response.status(403).send({success:false,message:"Role Not Updated Successfully"})
        }
    }

    @Patch("/blockUnblock/:id")
    async blockUnblockRole(@Res() response:Response,@Param("id") id:any,@Body() body:any):Promise<any> {
        let data:any = await this.rolesService.blockUnblockRole(id,body.is_active)
        if(data.affected > 0) {
            response.status(200).send({success:true,response:"Role Updated Successfully"})
        } else {
            response.status(403).send({success:false,message:"Role Not Updated Successfully"})
        }
    }
}

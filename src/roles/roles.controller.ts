import { Body, Controller, Get, Param, Patch, Post, Put, Res, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles.entity';
import { Repository } from 'typeorm';
import { RolesService } from './roles.service';
import {Response} from 'express'
import { Admin_Authorization_Guard } from 'src/Guards/authorization_guard';
@Controller('roles')
export class RolesController {
    constructor(
        private rolesService: RolesService,
    ) { }

    @Get("/list")
    // @UseGuards(Admin_Authorization_Guard)
    async getRoles(@Res() response:Response):Promise<any> {
        try {
            let data:any = await this.rolesService.getRoles()
            if(data && data.length > 0) {
                response.status(200).send({success:true,response:data})
            } else {
                response.status(403).send({success:false,message:"Data not found"})
            }
        } catch(err) {
            response.status(403).send({success:false,message:err})
        }
        
    }

    @Get("/:id")
    @UseGuards(Admin_Authorization_Guard)
    async getRole(@Res() response:Response,@Param("id") id:any):Promise<any> {
        try {
            let data:any = await this.rolesService.getRole(id)
            if(data) {
                response.status(200).send({success:true,response:data})
            } else {
                response.status(403).send({success:false,message:"Data not found"})
            }
        } catch(err) {
            response.status(403).send({success:false,message:err})
        }
        
    }

    @Post("/add")
    // @UseGuards(Admin_Authorization_Guard)
    async addRole(@Res() response:Response,@Body() body:any):Promise<any> {
        try{
            let data:any = await this.rolesService.addRole(body)
            if(data) {
                response.status(200).send({success:true,response:"Role Added Successfully"})
            } else {
                response.status(403).send({success:false,message:"Role Not Added Successfully"})
            }
        } catch(err) {
            response.status(200).send({success:true,response:err})
        }
        
    }

    @Put("/update/:id")
    @UseGuards(Admin_Authorization_Guard)
    async updateRole(@Res() response:Response,@Param("id") id:any,@Body() body:any):Promise<any> {
        try {
            let data:any = await this.rolesService.editRole(id,body)
            if(data.affected > 0) {
                response.status(200).send({success:true,response:"Role Updated Successfully"})
            } else {
                response.status(403).send({success:false,message:"Role Not Updated Successfully"})
            }
        } catch(err) {
            response.status(403).send({success:false,message:err})
        }
        
    }

    @Patch("/blockUnblock/:id")
    @UseGuards(Admin_Authorization_Guard)
    async blockUnblockRole(@Res() response:Response,@Param("id") id:any,@Body() body:any):Promise<any> {
        try {
            let data:any = await this.rolesService.blockUnblockRole(id,body.is_active)
            if(data.affected > 0) {
                response.status(200).send({success:true,response:"Role Updated Successfully"})
            } else {
                response.status(403).send({success:false,message:"Role Not Updated Successfully"})
            }
        } catch(err){
            response.status(403).send({success:false,message:err})
        }
        
    }
}

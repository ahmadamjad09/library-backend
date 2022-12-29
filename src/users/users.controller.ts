import { Body, Controller, Get, Param, Patch, Post, Put, Res, UseGuards } from '@nestjs/common';
import {Response} from 'express'
import { Role } from 'src/enums/enums';
import { Admin_Authorization_Guard, Admin_Author_Authorization_Guard } from 'src/Guards/authorization_guard';
import { UsersService } from './users.service';
import { UserRoles } from '../Guards/decorators/user_decorator.entity';
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) { }
    
    // @UserRoles(Role.ADMIN)
    @Get("/list")
    @UseGuards(Admin_Authorization_Guard)
    async getUsers(@Res() response:Response):Promise<any> {
        try {
            let data:any = await this.usersService.getUsers()
            console.log("data",data.length)
            if(data && data.length > 0) {
                response.status(200).send({success:true,response:data})
            } else {
                response.status(403).send({success:false,message:"Data not found"})
            }
        } catch(err) {
            response.status(403).send({success:false,message:err})
        }
        
    }

    @Get("/authors")
    @UseGuards(Admin_Author_Authorization_Guard)
    async getAuthors(@Res() response:Response):Promise<any> {
        try {
            let data:any = await this.usersService.getAuthors()
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
    async getUser(@Res() response:Response,@Param("id") id:any):Promise<any> {
        try {
            let data:any = await this.usersService.getUser(id)
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
    async addUser(@Res() response:Response,@Body() body:any):Promise<any> {
        try {
            let user = await this.usersService.getUserByEmail(body.email)
            if(user) {
                response.status(403).send({success:false,message:"User with this email already exists"})
            } else {
                var salt = bcrypt.genSaltSync(10);
                let password = body.password
                var hash = bcrypt.hashSync(password, salt);
                body.password = hash
                body.is_active = 0
                let data:any = await this.usersService.addUser(body)
                if(data) {
                    response.status(200).send({success:true,response:"User Added Successfully"})
                } else {
                    response.status(403).send({success:false,message:"User Not Added Successfully"})
                }
            }
        } catch(err){
            response.status(403).send({success:false,message:err})
        }
        
        
    }

    @Post("/auth")
    async auth(@Res() response:Response,@Body() body:any):Promise<any> {
        try {
            let user = await this.usersService.getUserByEmail(body.email)
            if(user) {
                let passwordcheck = bcrypt.compareSync(body.password, user.password);
                if(passwordcheck) {
                    let obj = {
                        user_name:user.user_name,
                        email:user.email,
                        role_id:user.role_id?.role_id
                    }
                    var token = jwt.sign(obj, "privateKey");
                    console.log("body",passwordcheck)
                    response.status(200).send({success:true,response:token})
                } else {
                    response.status(403).send({success:false,message:"Invalid Password"})
                }
            } else {
                response.status(403).send({success:false,message:"User Not Found"})
            }
        } catch (err) {
            response.status(403).send({success:false,message:err})
        }
        
    }

    @Put("/update/:id")
    @UseGuards(Admin_Authorization_Guard)
    async updateUser(@Res() response:Response,@Param("id") id:any,@Body() body:any):Promise<any> {
        try {
            let data:any = await this.usersService.editUser(id,body)
            if(data.affected > 0) {
                response.status(200).send({success:true,response:"User Updated Successfully"})
            } else {
                response.status(403).send({success:false,message:"User Not Updated Successfully"})
            }
        } catch(err) {
            response.status(403).send({success:false,message:err})
        }
        
    }

    @Patch("/blockUnblock/:id")
    @UseGuards(Admin_Authorization_Guard)
    async blockUnblockUser(@Res() response:Response,@Param("id") id:any,@Body() body:any):Promise<any> {
        try{
            let data:any = await this.usersService.blockUnblockUser(id,body.is_active)
            if(data.affected > 0) {
                response.status(200).send({success:true,response:"User Updated Successfully"})
            } else {
                response.status(403).send({success:false,message:"User Not Updated Successfully"})
            }
        } catch(err) {
            response.status(403).send({success:false,message:err})
        }
        
    }
}

import { Body, Controller, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
import {Response} from 'express'
import { UsersService } from './users.service';
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) { }

    @Get("/list")
    async getUsers(@Res() response:Response):Promise<any> {
        let data:any = await this.usersService.getUsers()
        if(data && data.length > 0) {
            response.status(200).send({success:true,response:data})
        } else {
            response.status(403).send({success:false,message:"Data not found"})
        }
    }

    @Get("/authors")
    async getAuthors(@Res() response:Response):Promise<any> {
        let data:any = await this.usersService.getAuthors()
        if(data && data.length > 0) {
            response.status(200).send({success:true,response:data})
        } else {
            response.status(403).send({success:false,message:"Data not found"})
        }
    }

    @Get("/:id")
    async getUser(@Res() response:Response,@Param("id") id:any):Promise<any> {
        let data:any = await this.usersService.getUser(id)
        if(data) {
            response.status(200).send({success:true,response:data})
        } else {
            response.status(403).send({success:false,message:"Data not found"})
        }
    }

    @Post("/add")
    async addUser(@Res() response:Response,@Body() body:any):Promise<any> {
        let user = await this.usersService.getUserByEmail(body.email)
        if(user) {
            response.status(403).send({success:false,message:"User with this email already exists"})
        } else {
            var salt = bcrypt.genSaltSync(10);
            let password = body.password
            var hash = bcrypt.hashSync(password, salt);
            body.password = hash
            let data:any = await this.usersService.addUser(body)
            if(data) {
                response.status(200).send({success:true,response:"User Added Successfully"})
            } else {
                response.status(403).send({success:false,message:"User Not Added Successfully"})
            }
        }
        
    }

    @Post("/auth")
    async auth(@Res() response:Response,@Body() body:any):Promise<any> {
        let user = await this.usersService.getUserByEmail(body.email)
        if(user) {
            let passwordcheck = bcrypt.compareSync(body.password, user.password);
            if(passwordcheck) {
                delete user.password
                var token = jwt.sign(user, "privateKey");
                response.status(403).send({success:true,response:token})
            } else {
                response.status(403).send({success:false,message:"Invalid Password"})
            }
        } else {
            response.status(403).send({success:false,message:"User Not Found"})
        }
    }

    @Put("/update/:id")
    async updateUser(@Res() response:Response,@Param("id") id:any,@Body() body:any):Promise<any> {
        let data:any = await this.usersService.editUser(id,body)
        if(data.affected > 0) {
            response.status(200).send({success:true,response:"User Updated Successfully"})
        } else {
            response.status(403).send({success:false,message:"User Not Updated Successfully"})
        }
    }

    @Patch("/blockUnblock/:id")
    async blockUnblockUser(@Res() response:Response,@Param("id") id:any,@Body() body:any):Promise<any> {
        let data:any = await this.usersService.blockUnblockUser(id,body.is_active)
        if(data.affected > 0) {
            response.status(200).send({success:true,response:"User Updated Successfully"})
        } else {
            response.status(403).send({success:false,message:"User Not Updated Successfully"})
        }
    }
}

import { Body, Controller, Get, Param, Patch, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import {Response} from 'express'
import { BooksService } from './books.service';
import { Admin_Author_Authorization_Guard, AUth_Guard } from 'src/Guards/authorization_guard';
import { UsersService } from 'src/users/users.service';
@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
        private usersService:UsersService
    ) { }

    @Get("/list")
    @UseGuards(AUth_Guard)
    async getBooks(@Res() response:Response):Promise<any> {
        try {
            let data:any = await this.booksService.getBooks()
            if(data && data.length > 0) {
                response.status(200).send({success:true,response:data})
            } else {
                response.status(403).send({success:false,message:"Data not found"})
            }
        }catch(err) {
            response.status(403).send({success:false,message:err})
        }
        
    }

    @Get("/:id")
    @UseGuards(AUth_Guard)
    async getBook(@Res() response:Response,@Param("id") id:any):Promise<any> {
        try {
            let data:any = await this.booksService.getBook(id)
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
    @UseGuards(Admin_Author_Authorization_Guard)
    async addBook(@Res() response:Response,@UploadedFile() file,@Body() body:any):Promise<any> {
        try{
            let user:any = await this.usersService.getUser(body.author_id)
            if(user && user.is_active == 1) {
                let obj = {
                    book_name:body.book_name,
                    description:body.description,
                    author_id:body.author_id,
                    image:body.image
                }
                let data:any = await this.booksService.addBook(obj)
                if(data) {
                    response.status(200).send({success:true,response:"Book Added Successfully"})
                } else {
                    response.status(403).send({success:false,message:"Book Not Added Successfully"})
                }
            } else {
                response.status(403).send({success:false,message:"Book Not Added Author is inactive"})
            }
            
        } catch(err) {
            response.status(403).send({success:false,message:err})
        }  
            
    }

    @Put("/update/:id")
    @UseGuards(Admin_Author_Authorization_Guard)
    async updateBook(@Res() response:Response,@Param("id") id:any,@Body() body:any):Promise<any> {
        try {
            let user:any = await this.usersService.getUser(body.author_id)
            if(user && user.is_active == 1) {
                let data:any = await this.booksService.editBook(id,body)
                if(data.affected > 0) {
                    response.status(200).send({success:true,response:"Book Updated Successfully"})
                } else {
                    response.status(403).send({success:false,message:"Book Not Updated Successfully"})
                }
            } else {
                response.status(403).send({success:false,message:"Book Not Updated User is inactive"})
            }
            
        } catch(err) {
            response.status(403).send({success:false,message:err})
        }
        
    }

    @Patch("/blockUnblock/:id")
    @UseGuards(Admin_Author_Authorization_Guard)
    async blockUnblockBook(@Res() response:Response,@Param("id") id:any,@Body() body:any):Promise<any> {
        try {
            let data:any = await this.booksService.blockUnblockBook(id,body.is_active)
            if(data.affected > 0) {
                response.status(200).send({success:true,response:"Book Updated Successfully"})
            } else {
                response.status(403).send({success:false,message:"Book Not Updated Successfully"})
            }
        } catch(err) {
            response.status(403).send({success:false,message:"Book Not Updated Successfully"})
        }
        
    }
}

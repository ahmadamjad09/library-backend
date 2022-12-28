import { Body, Controller, Get, Param, Patch, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import {Response} from 'express'
import { BooksService } from './books.service';
import {FileInterceptor} from '@nestjs/platform-express'
@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
    ) { }

    @Get("/list")
    async getRoles(@Res() response:Response):Promise<any> {
        let data:any = await this.booksService.getBooks()
        if(data && data.length > 0) {
            response.status(200).send({success:true,response:data})
        } else {
            response.status(403).send({success:false,message:"Data not found"})
        }
    }

    @Get("/:id")
    async getBook(@Res() response:Response,@Param("id") id:any):Promise<any> {
        let data:any = await this.booksService.getBook(id)
        if(data) {
            response.status(200).send({success:true,response:data})
        } else {
            response.status(403).send({success:false,message:"Data not found"})
        }
    }

    @Post("/add")
    async addBook(@Res() response:Response,@UploadedFile() file,@Body() body:any):Promise<any> {
            console.log("body",body)
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
    }

    @Put("/update/:id")
    async updateBook(@Res() response:Response,@Param("id") id:any,@Body() body:any):Promise<any> {
        console.log("body",body)
        let data:any = await this.booksService.editBook(id,body)
        if(data.affected > 0) {
            response.status(200).send({success:true,response:"Book Updated Successfully"})
        } else {
            response.status(403).send({success:false,message:"Book Not Updated Successfully"})
        }
    }

    @Patch("/blockUnblock/:id")
    async blockUnblockBook(@Res() response:Response,@Param("id") id:any,@Body() body:any):Promise<any> {
        let data:any = await this.booksService.blockUnblockBook(id,body.is_active)
        if(data.affected > 0) {
            response.status(200).send({success:true,response:"Book Updated Successfully"})
        } else {
            response.status(403).send({success:false,message:"Book Not Updated Successfully"})
        }
    }
}

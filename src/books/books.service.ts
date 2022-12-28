import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books } from 'src/entities/books.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Books) private booksRep: Repository<Books>
        ) { }

        async getBooks(): Promise<any> {
            return await this.booksRep.find({relations:["author_id"]})
        }
    
        async getBook(id:any): Promise<any> {
            return await this.booksRep.findOne({where:{book_id:id},relations:['author_id']})
        }
    
        async addBook(data:any): Promise<any> {
            return await this.booksRep.save(data)
        }
    
        async editBook(id:any,data:any): Promise<any> {
            return await this.booksRep.update(id,data)
        }
    
        async blockUnblockBook(id:any,is_active:any): Promise<any> {
            return await this.booksRep.createQueryBuilder()
            .update(Books)
            .set({ is_active })
            .where("book_id = :book_id", { book_id: id })
            .execute();
        }
}

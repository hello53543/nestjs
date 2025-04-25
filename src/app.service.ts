import { Injectable } from '@nestjs/common';
import { Book, books } from './FakeDatabase';
import { title } from 'process';
 
@Injectable()
export class BooksService {
 
  getAllBooks(): Book[] {
    return books;
  }
 
  findById(bookId: number): Book | undefined {
    return books.find((book) => book.id === bookId);
  }
 
  create(book: Partial<Book>): Book {
    const newID = books[books.length - 1].id + 1;
 
    const newBook: Book = {
      id: newID,
      author: book.author ?? '',
      title: book.title ?? '',
      publicationYear: book.publicationYear ?? 0,
    };
 
    books.push(newBook);
    return newBook;
  }

  update(bookID: number, updateBookFields: Partial<Book>): Book | undefined {
    const currentBook = books.find((book) => book.id === bookID);
    const updatedBook = {
      id: bookID,
      title: updateBookFields.title ?? currentBook.title,
      author: updateBookFields.author ?? currentBook.author,
      publicationYear: updateBookFields.publicationYear ?? currentBook.publicationYear,
    }; 
    books[bookID - 1] = updatedBook;

    return updatedBook;
  }

  delete(bookID: number): Book[] {
   books.splice(bookID-1, 1)
    return books;
  }
}
 
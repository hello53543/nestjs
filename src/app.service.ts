import { Injectable } from '@nestjs/common';
import { Book, books } from './FakeDatabase';
import { title } from 'process';
 
// Macht Klasse als Dienst verfügbar
@Injectable()
export class BooksService {
 
  // Gibt alle Bücher als ein Array zurück
  getAllBooks(): Book[] {
    return books;
  }
 
  findById(bookId: number): Book | undefined {
    return books.find((book) => book.id === bookId);
  }
 
  // Nimmt ein Buchobjekt entgegen und erstellt ein neues Buch.
  create(book: Partial<Book>): Book {
    const newID = books[books.length - 1].id + 1;
 
    const newBook: Book = {
      id: newID,
      author: book.author ?? '',
      title: book.title ?? '',
      publicationYear: book.publicationYear ?? 0,
    };
 
     // Fügt das neue Buch zum Array hinzu, gibt es zurück.
    books.push(newBook);
    return newBook;
  }

  // Aktualisiert ein Buch anhand der ID.
  update(bookID: number, updateBookFields: Partial<Book>): Book | undefined {
    const currentBook = books.find((book) => book.id === bookID);
    const updatedBook = {
      id: bookID,
      title: updateBookFields.title ?? currentBook.title,
      author: updateBookFields.author ?? currentBook.author,
      publicationYear: updateBookFields.publicationYear ?? currentBook.publicationYear,
    }; 
    // Ersetzt das alte Buch im Array durch das aktualisierte Buch.
    books[bookID - 1] = updatedBook;

    return updatedBook;
  }

  // Löscht ein Buch anhand der ID.
  delete(bookID: number): Book[] {
    // Entfernt das Buch mit der gegebenen ID aus dem Array.
   books.splice(bookID-1, 1)
    return books;
  }
}
 
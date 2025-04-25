import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './app.service';
import {Book} from './FakeDatabase'
import { get } from 'http';

//Wir müssen beim controller etwas in die klammern schreiben, damit wir diese einzel abfragen können.
// Der Controller wird definiert und 'books' als Basis-Route angegeben.
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

   // Definiert eine GET-Anfrage für die Basis-Route ('/books'), die alle Bücher zurückgibt.
  @Get()
  getAllBooks(): Book[] {
    return this.booksService.getAllBooks();
  }

  // Definiert eine GET-Anfrage für die Route '/books/getById/:id', die ein Buch anhand seiner ID zurückgibt.
  @Get('getById/:id')
  getBookById(@Param('id') id: string): Book | undefined {
    const bookID = +id  // Konvertiert den ID-Parameter von einem String in eine Zahl.
    return this.booksService.findById(bookID);
  }

  //neues buch wird hinzugefügt
  // Definiert eine POST-Anfrage für die Basis-Route ('/books'), die ein neues Buch hinzufügt.
  @Post()
  addBook(@Body() book: Partial<Book>): Book | undefined{
    const bookData = book;

     // Überprüft, ob die notwendigen Felder vorhanden sind. Wenn nicht, wird 'undefined' zurückgegeben.
    if (!book.author || !book.title || !book.publicationYear) return undefined;

    return this.booksService.create(bookData);
  }

   // Definiert eine PUT-Anfrage für die Route '/books/:id', die ein bestehendes Buch anhand seiner ID aktualisiert.
  @Put(':id')
  updatebook
(
  @Param('id') id: string,  // Nimmt die ID des zu aktualisierenden Buches als Parameter.
   @Body() book: Partial<Book>, // Nimmt die neuen Buchdaten aus dem Anfragekörper.
  ): Book | undefined {
    return this.booksService.update(+id, book); // Aktualisiert das Buch und gibt es zurück.
  }

   // Definiert eine DELETE-Anfrage für die Route '/books/:id', die ein Buch anhand seiner ID löscht.
  @Delete(':id')
  deleteBook(@Param('id') id: string): Book[] {
    return this.booksService.delete(+id)  // Löscht das Buch und gibt die aktualisierte Liste der Bücher zurück.
  }
  }
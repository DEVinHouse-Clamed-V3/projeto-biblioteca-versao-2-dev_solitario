import { Router } from 'express';
import { BookController } from '../controllers/book.controller';


const livroRoutes = Router();
// Criar um livro
livroRoutes.post("/", BookController.createBook);

// Buscar todos os livros
livroRoutes.get("/", BookController.getAllBooks);

// Buscar um livro específico por ID
livroRoutes.get("/:id", BookController.getBookById);

// Atualizar um livro
livroRoutes.put("/:id", BookController.updateBook);

// Deletar um livro
livroRoutes.delete("/:id", BookController.deleteBook);

// Buscar o ranking dos livros
livroRoutes.get("/ranking", BookController.getBookRanking);

export default livroRoutes;
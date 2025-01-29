import { Request, Response } from "express";

import { getRepository } from "typeorm";
import Livro from "../entities/Livro";

export class BookController {
  // Criar um livro
  static async createBook(req: Request, res: Response) {
    const { title, description, publication_date, isbn, page_count, language } = req.body;

    const bookRepository = getRepository(Livro);
    const newBook = bookRepository.create({
      title,
      description,
      publication_date,
      isbn,
      page_count,
      language,
    });

    try {
      await bookRepository.save(newBook);
      res.status(201).json(newBook);
    } catch (err: unknown) {
        // Verifica se o erro é uma instância de Error
        if (err instanceof Error) {
          res.status(400).json({ message: "Erro ao criar o livro", error: err.message });
        } else {
          res.status(400).json({ message: "Erro desconhecido ao criar o livro" });
        }
      }
      
  }

  // Buscar todos os livros com filtro de título e idioma
  static async getAllBooks(req: Request, res: Response) {
    const { title, language } = req.query;

    const bookRepository = getRepository(Livro);
    let query = bookRepository.createQueryBuilder("book");

    if (title) {
      query = query.andWhere("book.title ILIKE :title", { title: `%${title}%` });
    }

    if (language) {
      query = query.andWhere("book.language ILIKE :language", { language: `%${language}%` });
    }

    try {
      const books = await query.getMany();
      res.status(200).json(books);
    }  catch (err: unknown) {
        // Verificando se o erro é uma instância de Error
        if (err instanceof Error) {
          res.status(500).json({ message: "Erro ao buscar os livros", error: err.message });
        } else {
          res.status(500).json({ message: "Erro desconhecido ao buscar os livros" });
        }
  }}

  // Buscar um livro por ID
  static async getBookById(req: Request, res: Response) {
    const { id } = req.params;
  
    const bookRepository = getRepository(Livro);
  
    try {
      const book = await bookRepository.findOne({
        where: { id: Number(id) }, // Passando um objeto com a chave 'where'
      });
  
      if (!book) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      res.status(200).json(book);
    }catch (err: unknown) {
        // Verifica se o erro é uma instância de Error
        if (err instanceof Error) {
          res.status(500).json({ message: "Erro ao buscar o livro", error: err.message });
        } else {
          res.status(500).json({ message: "Erro desconhecido ao buscar o livro" });
        }
      }
  }

  // Atualizar um livro
  static async updateBook(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, publication_date, isbn, page_count, language } = req.body;
    
    const bookRepository = getRepository(Livro);
    
    try {
      const book = await bookRepository.findOne({
        where: { id: Number(id) }, // Passando um objeto com a chave 'where'
      });
    
      if (!book) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
    
      book.title = title || book.title;
      book.description = description || book.description;
      book.publication_date = publication_date || book.publication_date;
      book.isbn = isbn || book.isbn;
      book.page_count = page_count || book.page_count;
      book.language = language || book.language;
    
      await bookRepository.save(book);
    
      res.status(200).json(book);
    } catch (err: unknown) {
        // Verifica se o erro é uma instância de Error
        if (err instanceof Error) {
          res.status(400).json({ message: "Erro ao atualizar o livro", error: err.message });
        } else {
          res.status(400).json({ message: "Erro desconhecido ao atualizar o livro" });
        }
      }
      
    
  }

  static async deleteBook(req: Request, res: Response) {
    const { id } = req.params;
  
    const bookRepository = getRepository(Livro);
  
    try {
      const book = await bookRepository.findOne({
        where: { id: Number(id) },
      });
  
      if (!book) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
  
      await bookRepository.remove(book);
  
      res.status(200).json({ message: "Livro removido com sucesso" });
    } catch (err: unknown) {
      // Verificando se o erro é uma instância de Error
      if (err instanceof Error) {
        res.status(500).json({ message: "Erro ao deletar o livro", error: err.message });
      } else {
        res.status(500).json({ message: "Erro desconhecido ao deletar o livro" });
      }
    }
  }
  
  

  // Buscar ranking de livros (3 livros com mais páginas por idioma)
  static async getBookRanking(req: Request, res: Response) {
    const { language } = req.query;

    const bookRepository = getRepository(Livro);

    try {
      const ranking = await bookRepository
        .createQueryBuilder("book")
        .select("book.title, book.page_count, book.language")
        .where("book.language = :language", { language })
        .orderBy("book.page_count", "DESC")
        .limit(3)
        .getMany();

      res.status(200).json(ranking);
    } catch (err: unknown) {
        // Verifica se o erro é uma instância de Error
        if (err instanceof Error) {
          res.status(500).json({ message: "Erro ao buscar o ranking", error: err.message });
        } else {
          res.status(500).json({ message: "Erro desconhecido ao buscar o ranking" });
        }
      }
      
  }
}

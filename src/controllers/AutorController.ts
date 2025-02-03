import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Autor from "../entities/Autor";
import AppError from "../utils/AppError";

class AutorController {
  private authorRepository;

  constructor() {
    this.authorRepository = AppDataSource.getRepository(Autor);
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, birthdate, biography, nacionality } = req.body;

      if (!name) {
        throw new AppError("Nome é obrigatório", 400);
      }

      if (!nacionality) {
        throw new AppError("Nacionalidade é obrigatória", 400);
      }

      const author = this.authorRepository.create({
        name,
        birthdate,
        biography,
        nacionality,
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await this.authorRepository.save(author);

      res.status(201).json(author);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authors = await this.authorRepository.find({
        where: { active: true },
        order: { name: "ASC" },
      });
      res.json(authors);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const author = await this.authorRepository.findOneBy({ id: Number(id) });

      if (!author) {
        throw new AppError("Autor não encontrado", 404);
      }

      res.json(author);
    } catch (error) {
      next(error);
    }
  };

  getAuthorsBirthday = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authors = await this.authorRepository.find();
      const authorsBirthday = authors.filter((author) => {
        const authorBirthdate = new Date(author.birthdate);
        const today = new Date();
        return authorBirthdate.getMonth() === today.getMonth();
      });
      res.json(authorsBirthday);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, birthdate, biography, nacionality, active } = req.body;
      const author = await this.authorRepository.findOneBy({ id: Number(id) });

      if (!author) {
        throw new AppError("Autor não encontrado", 404);
      }

      author.name = name || author.name;
      author.birthdate = birthdate || author.birthdate;
      author.biography = biography || author.biography;
      author.nacionality = nacionality || author.nacionality;
      author.active = active || author.active;
      author.updated_at = new Date();

      await this.authorRepository.save(author);

      const authorUpdated = await this.authorRepository.findOneBy({ id: Number(id) });
      res.json(authorUpdated);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const author = await this.authorRepository.findOneBy({ id: Number(id) });

      if (!author) {
        throw new AppError("Autor não encontrado", 404);
      }

      await this.authorRepository.delete(author);
      res.json({ message: "Autor deletado com sucesso" });
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;

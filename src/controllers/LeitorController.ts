import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Leitor from "../entities/Leitor";

import AppError from "../utils/AppError";
import { Raw } from "typeorm";

export default class LeitorController {
  private readerRepository;

  constructor() {
    this.readerRepository = AppDataSource.getRepository(Leitor);
  }

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const body = request.body;

      if (!body.nome) {
        throw new AppError("O nome é obrigatório", 400);
      } else if (!body.email) {
        throw new AppError("O email é obrigatório", 400);
      } else if (!body.telefone) {
        throw new AppError("O número do telefone é obrigatório", 400);
      } else if (!body.dataNascimento) {
        throw new AppError("A data de nascimento é obrigatória", 400);
      } else if (!body.endereco) {
        throw new AppError("O endereço é obrigatório", 400);
      } else {
        const parts = body.dataNascimento.split("/");
        const dataNascimento = new Date(parts[2], parts[1] - 1, parts[0]);
        body.dataNascimento = dataNascimento;
        body.criadoEm = new Date()
        body.atualizadoEm = new Date()
        const leitorCriado = await this.readerRepository.save(body);

        response.status(201).json(leitorCriado);
      }
    } catch (error) {
      next(error);
    }
  };

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const query = request.query;
      const readers = await this.readerRepository.find();
      response.json(readers);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.params;
      const readers = await this.readerRepository.findOneBy({
        id: parseInt(request.params.id),
      });

      if (!readers) {
        throw new AppError("Leitor não encontrado", 404);
      } else {
        response.status(201).json(readers);
      }
    } catch (error) {
      next(error);
    }
  };

  upDate = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.params;
      const body = request.body;

      if (body.id || body.created_at || body.updated_at) {
        throw new AppError(
          "Existem informações que não podem ser atualizadas",
          403
        );
      }

      const readers = await this.readerRepository.findOneBy({
        id: parseInt(params.id),
      });

      if (!readers) {
        throw new AppError("Leitor não encontrado", 404);
      } else {
        const parts = body.dataNascimento.split("/");
        const dataNascimento = new Date(parts[2], parts[1] - 1, parts[0]);
        body.dataNascimento = dataNascimento;
        body.atualizadoEm = new Date()

        Object.assign(readers, body);

        const result = await this.readerRepository.save(readers);

        response.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.params;

      const readers = await this.readerRepository.findOneBy({
        id: parseInt(params.id),
      });

      if (!readers) {
        throw new AppError("Leitor não encontrado", 404);
      } else {
        await this.readerRepository.delete(readers.id);
        response.status(204).json();
      }
    } catch (error) {
      next(error);
    }
  };

  getAniversariante = async (request: Request, response: Response,next: NextFunction) => {
    try {
      const mesAtual = new Date().getMonth() + 1;
      console.log(mesAtual)
      const readers = await this.readerRepository.find({
        where: {
          dataNascimento: Raw(
            (alias) => `EXTRACT(MONTH FROM ${alias}) = ${mesAtual}`
          ),
        },
      });

      if (!readers) {
        throw new AppError("Não há aniversariantes este mês", 404);
      } else {
        response.status(201).json(readers);
      }
    } catch (error) {
      next(error);
    }
  };
}


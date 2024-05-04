import { Request, Response } from "express";
import { EstacaoModel } from "../models/Estacao";
import { Estacao } from "../types";

class EstacaoController {
  public async insert(estacao: Estacao): Promise<void> {
    try {
      const document = new EstacaoModel(estacao);
      await document.save(); // insere na coleção
    } catch (error: any) {
      console.log(estacao.estacao, error.message);
    }
  }

  public async lista(req: Request, res: Response): Promise<void> {
    try {
      const result = await EstacaoModel.find(
        {},
        {
          _id: 0,
          uf: 1,
          estacao: 1,
          latitude: 1,
          longitude: 1,
        },
        {
          sort: { estacao: 1 },
        }
      );
      res.json(result);
    } catch (error: any) {
      console.error("Erro ao contar as leituras por estação:", error.message);
      throw error;
    }
  }
}

export default new EstacaoController();

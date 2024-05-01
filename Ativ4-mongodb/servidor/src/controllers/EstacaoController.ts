import { Request, Response } from "express";
import { EstacaoModel } from "../models/Estacao";
import { Estacao } from "../types";
class EstacaoController {
  // Insere um documento na coleção estacoes
  public async insert(estacao: Estacao): Promise<void> {
    try {
      const document = new EstacaoModel(estacao);
      await document.save(); // insere na coleção
    } catch (error: any) {
      console.log(estacao.estacao, error.message);
    }
  }
}
export default new EstacaoController();

import { Router } from "express";
import estacaoRoutes from "./estacao";

const router = Router();

// Rotas relacionadas à entidade Estacao
router.use("/estacao", estacaoRoutes);

export default router;

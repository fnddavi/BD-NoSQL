import { Router } from "express";
import controller from "../controllers/EstacaoController";


const router = Router();

router.get("/lista", controller.lista);

export default router;

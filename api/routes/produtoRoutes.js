import { Router } from "express";

import {
    criarProduto,
    listarProdutos,
} from "../controllers/produtoController.js";

const router = Router();

router.post("/", criarProduto);
router.get("/", listarProdutos);

export default router;
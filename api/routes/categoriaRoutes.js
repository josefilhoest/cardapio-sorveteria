import { Router } from "express";

import {
    criarCategoria,
    listarCategorias,
} from "../controllers/categoriaController.js";

const router = Router();

router.post("/", criarCategoria);
router.get("/", listarCategorias);

export default router;
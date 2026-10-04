import { Categoria } from "../models/index.js";

export async function criarCategoria(req, res) {
    try {
        const { nome, slug } = req.body;

        if (!nome || !slug) {
            return res.status(400).json({
                mensagem: "Nome e slug são obrigatórios.",
            });
        }

        const categoria = await Categoria.create({
            nome,
            slug,
        });

        return res.status(201).json(categoria);
    } catch (error) {
        console.error("Erro ao criar categoria:", error);

        return res.status(500).json({
            mensagem: "Erro ao criar categoria.",
        });
    }
}

export async function listarCategorias(req, res) {
    try {
        const categorias = await Categoria.findAll({
            order: [["nome", "ASC"]],
        });

        return res.json(categorias);
    } catch (error) {
        console.error("Erro ao listar categorias:", error);

        return res.status(500).json({
            mensagem: "Erro ao listar categorias.",
        });
    }
}
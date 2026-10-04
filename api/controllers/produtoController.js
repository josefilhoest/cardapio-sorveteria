import { Produto, Categoria } from "../models/index.js";

export async function criarProduto(req, res) {
    try {
        const {
            nome,
            descricao,
            preco,
            imagem,
            categoriaId,
        } = req.body;

        if (!nome || !preco || !categoriaId) {
            return res.status(400).json({
                mensagem: "Nome, preço e categoria são obrigatórios.",
            });
        }

        const categoria = await Categoria.findByPk(categoriaId);

        if (!categoria) {
            return res.status(404).json({
                mensagem: "Categoria não encontrada.",
            });
        }

        const produto = await Produto.create({
            nome,
            descricao,
            preco,
            imagem,
            categoriaId,
        });

        return res.status(201).json(produto);
    } catch (error) {
        console.error("Erro ao criar produto:", error);

        return res.status(500).json({
            mensagem: "Erro ao criar produto.",
        });
    }
}

export async function listarProdutos(req, res) {
    try {
        const produtos = await Produto.findAll({
            include: [
                {
                    model: Categoria,
                    as: "categoria",
                    attributes: ["id", "nome", "slug"],
                },
            ],
            order: [["nome", "ASC"]],
        });

        return res.json(produtos);
    } catch (error) {
        console.error("Erro ao listar produtos:", error);

        return res.status(500).json({
            mensagem: "Erro ao listar produtos.",
        });
    }
}
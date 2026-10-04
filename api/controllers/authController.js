import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Usuario from "../models/Usuario.js";

// ========================================
// LOGIN
// ========================================

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // ----------------------------------------
        // Validar campos obrigatórios
        // ----------------------------------------

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Email e senha são obrigatórios.",
            });
        }

        // ----------------------------------------
        // Procurar usuário
        // ----------------------------------------

        const usuario = await Usuario.findOne({
            where: { email },
        });

        if (!usuario) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos.",
            });
        }

        // ----------------------------------------
        // Verificar se usuário está ativo
        // ----------------------------------------

        if (!usuario.ativo) {
            return res.status(403).json({
                mensagem: "Usuário desativado.",
            });
        }

        // ----------------------------------------
        // Comparar senha
        // ----------------------------------------

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senhaHash
        );

        if (!senhaValida) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos.",
            });
        }

        // ----------------------------------------
        // Gerar token
        // ----------------------------------------

        const token = jwt.sign(
            {
                id: usuario.id,
                perfil: usuario.perfil,
                estabelecimentoId: usuario.estabelecimentoId,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h",
            }
        );

        // ----------------------------------------
        // Atualizar último acesso
        // ----------------------------------------

        await usuario.update({
            ultimoAcesso: new Date(),
        });

        // ----------------------------------------
        // Resposta
        // ----------------------------------------

        return res.json({
            mensagem: "Login realizado com sucesso.",

            token,

            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil,
                estabelecimentoId: usuario.estabelecimentoId,
            },
        });
    } catch (error) {
        console.error("Erro no login:", error);

        return res.status(500).json({
            mensagem: "Erro interno ao realizar login.",
        });
    }
};
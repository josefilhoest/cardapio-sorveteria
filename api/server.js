import express from "express";
import cors from "cors";
import "dotenv/config";


import sequelize from "./config/database.js";
import "./models/index.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import produtoRoutes from "./routes/produtoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/categorias", categoriaRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        mensagem: "API da Sorveteria funcionando!",
    });
});

const PORT = process.env.PORT || 3001;

try {
    await sequelize.authenticate();
    console.log("Conexão com o MySQL realizada com sucesso!");

    await sequelize.sync();

    console.log("Tabelas sincronizadas com sucesso!");
} catch (error) {
    console.error("Erro ao conectar ou sincronizar o MySQL:", error.message);
}

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
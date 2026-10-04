import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Produto = sequelize.define(
    "Produto",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        preco: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        imagem: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        disponivel: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        categoriaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "produtos",
        timestamps: true,
    }
);

export default Produto;
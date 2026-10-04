import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Categoria = sequelize.define(
    "Categoria",
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

        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        ativa: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        tableName: "categorias",
        timestamps: true,

        indexes: [
            {
                name: "uq_categorias_estabelecimento_slug",
                unique: true,
                fields: ["estabelecimentoId", "slug"],
            },
        ],
    }
);

export default Categoria;
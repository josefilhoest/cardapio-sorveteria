import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PedidoItem = sequelize.define(
    "PedidoItem",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },

        tipoPreco: {
            type: DataTypes.ENUM("FIXO", "PESO"),
            allowNull: false,
            defaultValue: "FIXO",
        },

        valorUnitario: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },

        pesoGramas: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        valorFinal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },

        observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "pedido_itens",
        timestamps: true,
    }
);

export default PedidoItem;
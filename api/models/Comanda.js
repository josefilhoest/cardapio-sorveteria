import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Comanda = sequelize.define(
    "Comanda",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        identificacao: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        status: {
            type: DataTypes.ENUM(
                "ABERTA",
                "AGUARDANDO_PAGAMENTO",
                "FECHADA",
                "CANCELADA"
            ),
            allowNull: false,
            defaultValue: "ABERTA",
        },

        formaPagamento: {
            type: DataTypes.ENUM(
                "DINHEIRO",
                "PIX",
                "CARTAO",
                "NAO_DEFINIDO"
            ),
            allowNull: false,
            defaultValue: "NAO_DEFINIDO",
        },

        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },

        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },

        pago: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        abertaEm: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        fechadaEm: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "comandas",
        timestamps: true,
    }
);

export default Comanda;
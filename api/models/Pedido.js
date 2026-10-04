import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Pedido = sequelize.define(
    "Pedido",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        numeroPedido: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        tipoAtendimento: {
            type: DataTypes.ENUM("DELIVERY", "RETIRADA", "MESA"),
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM(
                "NOVO",
                "EM_PRODUCAO",
                "PRONTO",
                "SAIU_PARA_ENTREGA",
                "ENTREGUE",
                "FINALIZADO",
                "CANCELADO"
            ),
            allowNull: false,
            defaultValue: "NOVO",
        },

        nomeCliente: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        telefoneCliente: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        enderecoEntrega: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        bairro: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        taxaEntrega: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
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

        trocoPara: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
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

        observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        pago: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: "pedidos",
        timestamps: true,
    }
);

export default Pedido;
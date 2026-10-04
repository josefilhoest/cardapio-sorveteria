import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Estabelecimento = sequelize.define(
    "Estabelecimento",
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

        nomeFantasia: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        whatsapp: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        endereco: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        cidade: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        estado: {
            type: DataTypes.STRING(2),
            allowNull: true,
        },

        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        licencaStatus: {
            type: DataTypes.ENUM(
                "ATIVA",
                "BLOQUEADA",
                "SUSPENSA"
            ),
            allowNull: false,
            defaultValue: "ATIVA",
        },

        inicioLicenca: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },

        observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "estabelecimentos",
        timestamps: true,
    }
);

export default Estabelecimento;
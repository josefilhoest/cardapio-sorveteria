import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Mesa = sequelize.define(
    "Mesa",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },

        nome: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        status: {
            type: DataTypes.ENUM("LIVRE", "OCUPADA", "AGUARDANDO_PAGAMENTO"),
            allowNull: false,
            defaultValue: "LIVRE",
        },

        ativa: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        tableName: "mesas",
        timestamps: true,

        indexes: [
            {
                name: "uq_mesas_estabelecimento_numero",
                unique: true,
                fields: ["estabelecimentoId", "numero"],
            },
        ],
    }
);

export default Mesa;
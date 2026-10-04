import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Usuario = sequelize.define(
    "Usuario",
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

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        senhaHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        perfil: {
            type: DataTypes.ENUM(
                "SUPER_ADMIN",
                "ADMIN_LOJA",
                "ATENDENTE",
                "COZINHA",
                "ENTREGADOR"
            ),
            allowNull: false,
        },

        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        ultimoAcesso: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "usuarios",
        timestamps: true,
    }
);

export default Usuario;
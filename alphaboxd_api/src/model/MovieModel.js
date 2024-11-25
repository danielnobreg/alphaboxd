import { BLOB, DataTypes } from "sequelize";
import db from "../db/db.js";

export default db.define("movies", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    moviePosterUrl: {
        type: DataTypes.STRING(255),
        // type: BLOB('medium'),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    actors: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    ageRange: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
});
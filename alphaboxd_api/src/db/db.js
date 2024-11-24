import { Sequelize } from "sequelize";

const DB_NAME = "alphaboxd_db";
const DB_USER = "";
const DB_PASSWORD = "";
const DB_HOST = "localhost";
const DB_DIALECT = "mysql";
const DB_PORT = 3306;

export default new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD, {
        host: DB_HOST,
        dialect: DB_DIALECT,
        port:DB_PORT
    }
);

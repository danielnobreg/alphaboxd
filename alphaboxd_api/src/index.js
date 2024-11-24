import express from "express";
import FilmeRouter from "./router/FilmeRouter.js";
import db from "./db/db.js";

const server = express();
const port = 5000;

server.use(express.json());
server.use(FilmeRouter);

db.sync().then(()=> {
    server.listen(port, ()=> {
        console.log(`server listening on port: ${port}`);
    });
});

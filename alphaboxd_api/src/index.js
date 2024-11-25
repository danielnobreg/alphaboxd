import express from 'express';
import MovieRoutes from './router/MovieRoutes.js';
import db from "./db/db.js";
import cors from "cors";
const server = express();
const port = 5000;
server.use(cors());
server.use(express.json());
server.use(MovieRoutes);

db.sync().then(()=>{
    server.listen(port, ()=>{
        console.log(`Server running on port: ${port}`);
    });
});
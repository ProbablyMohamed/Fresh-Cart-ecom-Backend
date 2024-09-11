import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bootstrap from './src/bootstrap.js'
import globalError from "./src/middleware/globalError.js";



const app = express();
const port = process.env.PORT ||3000; 
app.use(cors());
bootstrap(app, express);
app.get("/", (req, res) => {
    res.send("Hello World!");
}); 
app.use(globalError)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
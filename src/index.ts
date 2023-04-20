import express, { json, Request, Response } from "express";
import fruitsRouter from "./routers/fruits-router";
import "dotenv/config"
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());

app.get("/health", (req: Request, res: Response) => res.send("I'am alive!"));
app.use(fruitsRouter);

export default app;
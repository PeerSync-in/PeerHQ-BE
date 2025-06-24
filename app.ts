import { Request, Response } from "express";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const getHello = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Hello, World!" });
};


export default app;
import express from "express";

export const test = (req: express.Request, res: express.Response) => {
  res.json("Great sucess!");
};

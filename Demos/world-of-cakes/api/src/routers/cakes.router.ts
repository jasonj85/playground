import express, { Request, Response } from "express";
import * as CakeInventoryService from "../services/cakes.service";
import { BaseCake, Cake } from "../interfaces/cake.interface";

// Router Definition
export const cakesRouter = express.Router();

// Controller Definitions
// GET cakes
cakesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const cakes: any = await CakeInventoryService.findAll();

    res.status(200).send(cakes);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// GET cakes/:id
cakesRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const cake: Cake | undefined = await CakeInventoryService.find(id);

    if (cake) {
      return res.status(200).send(cake);
    }

    res.status(404).send(`Cake with Id: ${id} not found`);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// POST cakes
cakesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const cake: BaseCake = req.body;
    const newCake = await CakeInventoryService.create(cake);

    res.status(201).json(newCake);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// PUT cakes/:id
cakesRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const cakeUpdate: Cake = req.body;
    const existingCake: Cake | undefined = await CakeInventoryService.find(id);

    if (existingCake) {
      const updatedCake = await CakeInventoryService.update(id, cakeUpdate);
      return res.status(200).json(updatedCake);
    }

    const newCake = await CakeInventoryService.create(cakeUpdate);

    res.status(201).json(newCake);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// DELETE cakes/:id
cakesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await CakeInventoryService.remove(id);

    res.sendStatus(204);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

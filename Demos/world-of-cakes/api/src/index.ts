import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

// Routers
import { cakeInventoryRouter } from "./routers/cakes.router";
import { initialiseDB } from "../database/connect";

// App Variables - from .env or 5000 as default
const PORT: number = parseInt(process.env.PORT as string, 10) | 5000;

// Database configuration
initialiseDB().catch((err) => console.log(err));

// App Configuration
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cakes/", cakeInventoryRouter);

// Server Activation
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

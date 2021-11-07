import { Router } from "express";
import { getAllUserTickets } from "../controllers/tickets.controllers";

const router = Router();

router.get('/:usernameId/tickets',getAllUserTickets);

export default router;


import { Router } from "express";
import { getAllUserTickets,createTicket } from "../controllers/tickets.controllers";

const router = Router();

router.get('/:usernameId/tickets',getAllUserTickets);
router.post('/createTicket',createTicket);

export default router;


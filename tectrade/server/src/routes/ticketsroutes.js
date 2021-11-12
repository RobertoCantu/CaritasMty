import { Router } from "express";
import {
  getAllUserTickets,
  createTicket,
  deleteTicket,
  editTicket
} from "../controllers/tickets.controllers";

const router = Router();

router.get("/:usernameId/tickets", getAllUserTickets);
router.post("/createTicket", createTicket);
// router.put("editTicket/:ticketId", editTicket);
router.delete("/deleteTicket/:ticketId", deleteTicket);

export default router;
import { Router } from "express";
import {
  getAllUserTickets,
  createTicket,
  deleteTicket,
  editTicket
} from "../controllers/tickets.controllers";
import { formValidation } from "../MiddleWares/app";
import { ticketSchema } from "../Validations/TicketValidation";

const router = Router();

router.get("/:usernameId/tickets", getAllUserTickets);
router.post("/createTicket", formValidation(ticketSchema), createTicket);
router.put("/editTicket/:ticketId", editTicket);
router.delete("/deleteTicket/:ticketId", deleteTicket);

export default router;
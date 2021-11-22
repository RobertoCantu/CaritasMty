import { Router } from "express";
import {
  getAllUserTickets,
  createTicket,
  deleteTicket,
  editTicket,
  resolveTicket,
  getAllTickets
} from "../controllers/tickets.controllers";
import { formValidation } from "../MiddleWares/app";
import { ticketSchema } from "../Validations/TicketValidation";

const router = Router();

router.get("/:usernameId/tickets", getAllUserTickets);
router.get("/allTickets", getAllTickets);
router.post("/createTicket", formValidation(ticketSchema), createTicket);
router.put("/editTicket/:ticketId", editTicket);
router.delete("/deleteTicket/:ticketId", deleteTicket);
router.get("/resolveTicket/:ticketId", resolveTicket);

export default router;
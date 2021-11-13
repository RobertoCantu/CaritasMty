export const queries = {
  getUser: "SELECT * FROM users where Email = @Email AND Password = @Password",
  getAllUserTickets: "SELECT tickets.TicketId,tickets.Title,tickets.Description,tickets.Date,tickets.Status FROM users INNER JOIN tickets ON users.UserId = tickets.UserId WHERE users.UserId = @UsernameId AND tickets.UserId = @UsernameId",
  getAllTickets: "SELECT users.UserId,users.FirstName,users.LastName,users.Email,tickets.TicketId,tickets.Title,tickets.Department,tickets.Description,tickets.Date,tickets.Status FROM users INNER JOIN tickets ON users.UserId = tickets.UserId",
  createTicket: "INSERT INTO tickets (Title,Department,Description,Date,Status,UserId) VALUES (@TicketTitle,@TicketDepartment,@TicketDescription,@TicketDate,@TicketStatus,@TicketUserId) ",
  deleteTicket: "DELETE FROM tickets WHERE TicketId = @TicketId"
};

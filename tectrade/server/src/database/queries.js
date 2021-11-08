export const queries = {
    getUser: 'SELECT * FROM users where Email = @Email AND Password = @Password',
    getAllUserTickets: 'SELECT tickets.TicketId,tickets.Title,tickets.Description,tickets.Date,tickets.Status FROM users INNER JOIN tickets ON users.UserId = tickets.UserId WHERE users.UserId = @UsernameId AND tickets.UserId = @UsernameId',
    createTicket: 'INSERT INTO tickets (Title,Department,Description,Date,Status,UserId) VALUES (@TicketTitle,@TicketDepartment,@TicketDescription,@TicketDate,@TicketStatus,@TicketUserId) '
}

 
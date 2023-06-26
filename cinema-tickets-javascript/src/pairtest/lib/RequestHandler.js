class RequestHandler {
  static handleRequest(request) {
    const numberOfTickets = request.getNoOfTickets();
    const handledRequest = {
      type: request.getTicketType(),
      ticketCount: numberOfTickets,
      seats: numberOfTickets,
      cost: 20 * numberOfTickets,
    };
    return handledRequest;
  }
}

export default RequestHandler
;

import TicketPrices from "./TicketPrices";

export default class TicketRequestHandler {
  static handleRequest(request) {
    const numberOfTickets = request.getNoOfTickets();
    const ticketType = request.getTicketType();
    const handledRequest = {
      type: ticketType,
      ticketCount: numberOfTickets,
      seats: ticketType !== "INFANT" ? numberOfTickets : 0,
      cost: TicketPrices.getTicketPriceByType(ticketType) * numberOfTickets,
    };
    return handledRequest;
  }
}

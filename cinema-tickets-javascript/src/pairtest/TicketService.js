import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import RequestHandler from "./lib/RequestHandler.js";

export default class TicketService {
  #totalTicketCount = 0;
  #ticketTypes = { ADULT: 0, CHILD: 0, INFANT: 0 };
  #totalSeats = 0;
  #totalCost = 0;
  #handleRequest = RequestHandler.handleRequest;
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    for (const request of ticketTypeRequests) {
      const { ticketCount, type, seats, cost } = this.#handleRequest(request);
      
      this.#totalTicketCount += ticketCount;
      this.#ticketTypes[type] += ticketCount;
      this.#totalSeats += ticketCount;
      this.#totalCost += cost;
    }

    return `Thank you for your purchase. \n Order summary: \n tickets: ${
      this.#ticketTypes.ADULT
    } ADULT, \n total seats: ${this.#totalSeats} \n total payment: £${
      this.#totalCost
    }.00`;
  }
}

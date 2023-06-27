import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import RequestHandler from "./lib/TicketRequestHandler.js";
import TicketPurchaseSummary from "./lib/TicketPurchaseSummary.js";

export default class TicketService {
  #totalTicketCount = 0;
  #ticketTypes = { ADULT: 0, CHILD: 0, INFANT: 0 };
  #totalSeats = 0;
  #totalCost = 0;
  #handleRequest = RequestHandler.handleRequest;
  #generatePurchaseSummary = TicketPurchaseSummary.generatePurchaseSummary;
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {

    // process each request
    for (const request of ticketTypeRequests) {

      const { ticketCount, type, seats, cost } = this.#handleRequest(request);

      this.#totalTicketCount += ticketCount;
      this.#ticketTypes[type] += ticketCount;
      this.#totalSeats += seats;
      this.#totalCost += cost;
    }

    //

    //generate purchase summary to return
    const purchaseSummary = this.#generatePurchaseSummary(
      this.#ticketTypes,
      this.#totalSeats,
      this.#totalCost
    );

    return purchaseSummary;
  }
}

import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import Utils from "../pairtest/utils/Utils.js";

export default class TicketService {
  #handleRequests = Utils.handleRequests;
  constructor() {}

  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    const { ticketCount, type, seats, cost } = this.#handleRequests(
      ...ticketTypeRequests
    );

    return `Thank you for your purchase. \n Order summary: \n tickets: ${ticketCount} ${type}, \n total seats: ${seats} \n total payment: £${cost}.00`;
  }
}

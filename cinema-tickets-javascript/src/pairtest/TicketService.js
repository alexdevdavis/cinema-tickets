import RequestHandler from "./lib/TicketRequestHandler.js";
import TicketPurchaseSummary from "./lib/TicketPurchaseSummary.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
import PurchaseHandler from "./lib/PurchaseHandler.js";

export default class TicketService {
  #totalTicketCount = 0;
  #ticketTypes = { ADULT: 0, CHILD: 0, INFANT: 0 };
  #totalSeats = 0;
  #totalCost = 0;
  #handleRequest = RequestHandler.handleRequest;
  #generatePurchaseSummary = TicketPurchaseSummary.generatePurchaseSummary;
  #validatePurchase = PurchaseHandler.validatePurchase;

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

    // ensure all purchase business rules are met
    this.#validatePurchase(this.#ticketTypes.ADULT, this.#totalTicketCount, accountId);

    // make calls to payment gateway and seat booking
    new TicketPaymentService().makePayment(accountId, this.#totalCost);
    new SeatReservationService().reserveSeat(accountId, this.#totalSeats);

    //generate purchase summary to return
    const purchaseSummary = this.#generatePurchaseSummary(
      this.#ticketTypes,
      this.#totalSeats,
      this.#totalCost
    );

    return purchaseSummary;
  }
}
